import React, { PureComponent, Fragment } from 'react';
import { HUNDRED_PERCENT, MAX_PERCENT } from '/imports/utils/slideCalcUtils';
import { defineMessages, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import Slide from './slide/component';
import PresentationTopToolbarContainer from './presentation-top-toolbar';
import PresentationBottomToolbarContainer from './presentation-bottom-toolbar';
import PresentationOverlayContainer from './presentation-overlay/container';
import { styles } from './styles.scss';
import toastStyles from '/imports/ui/components/toast/styles';
import DownloadPresentationButton from './download-presentation-button/component';
import FullscreenService from '../fullscreen-button/service';
import FullscreenButtonContainer from '../fullscreen-button/FullscreenButtonContainer';
import Icon from '/imports/ui/components/icon/component';
import { withLayoutConsumer } from '/imports/ui/components/layout/context';

const intlMessages = defineMessages({
  presentationLabel: {
    id: 'app.presentationUploder.title',
    description: 'presentation area element label',
  },
  changeNotification: {
    id: 'app.presentation.notificationLabel',
    description: 'label displayed in toast when presentation switches',
  },
  downloadLabel: {
    id: 'app.presentation.downloadLabel',
    description: 'label for downloadable presentations',
  },
  slideContentStart: {
    id: 'app.presentation.startSlideContent',
    description: 'Indicate the slide content start',
  },
  slideContentEnd: {
    id: 'app.presentation.endSlideContent',
    description: 'Indicate the slide content end',
  },
  noSlideContent: {
    id: 'app.presentation.emptySlideContent',
    description: 'No content available for slide',
  },
});

const ALLOW_FULLSCREEN = Meteor.settings.public.app.allowFullscreen;

class PresentationArea extends PureComponent {
  constructor() {
    super();

    this.state = {
      presentationAreaWidth: 0,
      presentationAreaHeight: 0,
      showSlide: false,
      zoom: 100,
      fitToWidth: false,
      isFullscreen: false,
      isWrapperRendered: false,
    };

    this.currentPresentationToastId = null;

    this.getSvgRef = this.getSvgRef.bind(this);
    this.setFitToWidth = this.setFitToWidth.bind(this);
    this.zoomChanger = this.zoomChanger.bind(this);
    this.updateLocalPosition = this.updateLocalPosition.bind(this);
    this.panAndZoomChanger = this.panAndZoomChanger.bind(this);
    this.fitToWidthHandler = this.fitToWidthHandler.bind(this);
    this.onFullscreenChange = this.onFullscreenChange.bind(this);
    this.getPresentationSizesAvailable = this.getPresentationSizesAvailable.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.calculateSize = this.calculateSize.bind(this);
    this.updateWrapperRenderFlag = this.updateWrapperRenderFlag.bind(this);

    this.onResize = () => setTimeout(this.handleResize.bind(this), 0);
    this.renderCurrentPresentationToast = this.renderCurrentPresentationToast.bind(this);
    this.refimgWrapper = null;
  }

  static getDerivedStateFromProps(props, state) {
    const { prevProps } = state;
    const stateChange = { prevProps: props };

    if (props.userIsPresenter
      && (!prevProps || !prevProps.userIsPresenter)
      && props.currentSlide
      && props.slidePosition) {
      let potentialZoom = 100 / (props.slidePosition.viewBoxWidth / props.slidePosition.width);
      potentialZoom = Math.max(HUNDRED_PERCENT, Math.min(MAX_PERCENT, potentialZoom));
      stateChange.zoom = potentialZoom;
    }

    if (!prevProps) return stateChange;

    // When presenter is changed or slide changed we reset localPosition
    if (prevProps.currentSlide.id !== props.currentSlide.id
      || prevProps.userIsPresenter !== props.userIsPresenter) {
      stateChange.localPosition = undefined;
    }

    return stateChange;
  }

  componentDidMount() {
    this.getInitialPresentationSizes();
    this.refPresentationContainer.addEventListener('fullscreenchange', this.onFullscreenChange);
    window.addEventListener('resize', this.onResize, false);
    window.addEventListener('layoutSizesSets', this.onResize, false);

    const { slidePosition, layoutContextDispatch } = this.props;

    let currWidth = 0;
    let currHeight = 0;

    if (slidePosition) {
      currWidth = slidePosition.width;
      currHeight = slidePosition.height;
    }

    layoutContextDispatch({
      type: 'setPresentationSlideSize',
      value: {
        width: currWidth,
        height: currHeight,
      },
    });

    if (currWidth > currHeight || currWidth === currHeight) {
      layoutContextDispatch({
        type: 'setPresentationOrientation',
        value: 'landscape',
      });
    }
    if (currHeight > currWidth) {
      layoutContextDispatch({
        type: 'setPresentationOrientation',
        value: 'portrait',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      currentPresentation,
      slidePosition,
      layoutSwapped,
      currentSlide,
      publishedPoll,
      isViewer,
      toggleSwapLayout,
      restoreOnUpdate,
      layoutContextDispatch,
      layoutContextState,
      userIsPresenter,
    } = this.props;
    const { isWrapperRendered } = this.state;

    const { numUsersVideo } = layoutContextState;
    const { layoutContextState: prevLayoutContextState } = prevProps;
    const {
      numUsersVideo: prevNumUsersVideo,
    } = prevLayoutContextState;

    if (numUsersVideo !== prevNumUsersVideo) {
      this.onResize();
    }

    const { width: prevWidth, height: prevHeight } = prevProps.slidePosition;
    const { width: currWidth, height: currHeight } = slidePosition;

    if (prevProps.slidePosition.id !== slidePosition.id) {
      if ((prevWidth > prevHeight && currHeight > currWidth)
        || (prevHeight > prevWidth && currWidth > currHeight)) {
        layoutContextDispatch(
          {
            type: 'setAutoArrangeLayout',
            value: true,
          },
        );
      }
      window.dispatchEvent(new Event('slideChanged'));
    }

    if (prevWidth !== currWidth || prevHeight !== currHeight) {
      layoutContextDispatch({
        type: 'setPresentationSlideSize',
        value: {
          width: currWidth,
          height: currHeight,
        },
      });
      if (currWidth > currHeight || currWidth === currHeight) {
        layoutContextDispatch({
          type: 'setPresentationOrientation',
          value: 'landscape',
        });
      }
      if (currHeight > currWidth) {
        layoutContextDispatch({
          type: 'setPresentationOrientation',
          value: 'portrait',
        });
      }
    }

    const downloadableOn = !prevProps.currentPresentation.downloadable
      && currentPresentation.downloadable;

    const shouldCloseToast = !(currentPresentation.downloadable && !userIsPresenter);

    if (
      prevProps.currentPresentation.name !== currentPresentation.name
      || (downloadableOn && !userIsPresenter)
    ) {
      if (this.currentPresentationToastId) {
        toast.update(this.currentPresentationToastId, {
          autoClose: shouldCloseToast,
          render: this.renderCurrentPresentationToast(),
        });
      } else {
        this.currentPresentationToastId = toast(this.renderCurrentPresentationToast(), {
          onClose: () => { this.currentPresentationToastId = null; },
          autoClose: shouldCloseToast,
          className: toastStyles.actionToast,
        });
      }
    }

    const downloadableOff = prevProps.currentPresentation.downloadable
      && !currentPresentation.downloadable;

    if (this.currentPresentationToastId && downloadableOff) {
      toast.update(this.currentPresentationToastId, {
        autoClose: true,
        render: this.renderCurrentPresentationToast(),
      });
    }

    if (layoutSwapped && restoreOnUpdate && isViewer && currentSlide) {
      const slideChanged = currentSlide.id !== prevProps.currentSlide.id;
      const positionChanged = slidePosition.viewBoxHeight !== prevProps.slidePosition.viewBoxHeight
        || slidePosition.viewBoxWidth !== prevProps.slidePosition.viewBoxWidth;
      const pollPublished = publishedPoll && !prevProps.publishedPoll;
      if (slideChanged || positionChanged || pollPublished) {
        toggleSwapLayout();
      }
    }

    if (!isWrapperRendered && this.refimgWrapper) {
      this.updateWrapperRenderFlag(true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
    window.removeEventListener('layoutSizesSets', this.onResize, false);
    this.refPresentationContainer.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  onFullscreenChange() {
    const { layoutContextDispatch } = this.props;
    const { isFullscreen } = this.state;
    const newIsFullscreen = FullscreenService.isFullScreen(this.refPresentationContainer);
    if (isFullscreen !== newIsFullscreen) {
      this.setState({ isFullscreen: newIsFullscreen });
      layoutContextDispatch({ type: 'setPresentationFullscreen', value: newIsFullscreen });
      window.dispatchEvent(new Event('slideChanged'));
    }
  }

  // returns a ref to the svg element, which is required by a WhiteboardOverlay
  // to transform screen coordinates to svg coordinate system
  getSvgRef() {
    return this.svggroup;
  }

  getToolbarHeight() {
    const { refPresentationToolbar } = this;
    let height = 0;
    if (refPresentationToolbar) {
      const { clientHeight } = refPresentationToolbar;
      height = clientHeight;
    }
    return height;
  }

  getPresentationSizesAvailable() {
    const { layoutContextState } = this.props;
    const {
      presentationAreaSize,
      webcamsAreaResizing,
      mediaBounds,
      tempWebcamsAreaSize,
      webcamsPlacement,
    } = layoutContextState;
    const presentationSizes = {
      presentationAreaWidth: 0,
      presentationAreaHeight: 0,
    };

    presentationSizes.presentationAreaWidth = webcamsAreaResizing && (webcamsPlacement === 'left' || webcamsPlacement === 'right')
      ? mediaBounds.width - tempWebcamsAreaSize.width
      : presentationAreaSize.width;
    presentationSizes.presentationAreaHeight = webcamsAreaResizing && (webcamsPlacement === 'top' || webcamsPlacement === 'bottom')
      ? mediaBounds.height - tempWebcamsAreaSize.height - (this.getToolbarHeight() || 0) - 30
      : presentationAreaSize.height - (this.getToolbarHeight() || 0);
    return presentationSizes;
  }

  getInitialPresentationSizes() {
    // determining the presentationAreaWidth and presentationAreaHeight (available
    // space for the svg) on the initial load

    const presentationSizes = this.getPresentationSizesAvailable();
    if (Object.keys(presentationSizes).length > 0) {
      // setting the state of the available space for the svg
      // and set the showSlide to true to start rendering the slide
      this.setState({
        presentationAreaHeight: presentationSizes.presentationAreaHeight,
        presentationAreaWidth: presentationSizes.presentationAreaWidth,
        showSlide: true,
      });
    }
  }

  setFitToWidth(fitToWidth) {
    this.setState({ fitToWidth });
  }

  updateWrapperRenderFlag(flag) {
    this.setState({ isWrapperRendered: flag });
  }

  calculateSize(viewBoxDimensions) {
    let {
      presentationAreaHeight,
      presentationAreaWidth,
    } = this.state;

    if (presentationAreaHeight === 0) {
      presentationAreaHeight = this.refimgWrapper?.clientHeight || 0;
    }

    if (presentationAreaWidth === 0) {
      presentationAreaWidth = this.refimgWrapper?.clientWidth || 0;
    }

    const { fitToWidth } = this.state;

    const {
      userIsPresenter,
      currentSlide,
      slidePosition,
    } = this.props;

    if (!currentSlide || !slidePosition) {
      return { width: 0, height: 0 };
    }

    const originalWidth = slidePosition.width;
    const originalHeight = slidePosition.height;
    const viewBoxWidth = viewBoxDimensions.width;
    const viewBoxHeight = viewBoxDimensions.height;

    let svgWidth;
    let svgHeight;

    if (!userIsPresenter) {
      svgWidth = (presentationAreaHeight * viewBoxWidth) / viewBoxHeight;
      if (presentationAreaWidth < svgWidth) {
        svgHeight = (presentationAreaHeight * presentationAreaWidth) / svgWidth;
        svgWidth = presentationAreaWidth;
      } else {
        svgHeight = presentationAreaHeight;
      }
    } else if (!fitToWidth) {
      svgWidth = (presentationAreaHeight * originalWidth) / originalHeight;
      if (presentationAreaWidth < svgWidth) {
        svgHeight = (presentationAreaHeight * presentationAreaWidth) / svgWidth;
        svgWidth = presentationAreaWidth;
      } else {
        svgHeight = presentationAreaHeight;
      }
    } else {
      svgWidth = presentationAreaWidth;
      svgHeight = (svgWidth * originalHeight) / originalWidth;
      if (svgHeight > presentationAreaHeight) svgHeight = presentationAreaHeight;
    }

    return {
      width: svgWidth,
      height: svgHeight,
    };
  }

  handleResize() {
    const presentationSizes = this.getPresentationSizesAvailable();
    if (Object.keys(presentationSizes).length > 0) {
      // updating the size of the space available for the slide
      this.setState({
        presentationAreaHeight: presentationSizes.presentationAreaHeight,
        presentationAreaWidth: presentationSizes.presentationAreaWidth,
      });
    }
  }

  zoomChanger(incomingZoom) {
    const {
      zoom,
    } = this.state;

    let newZoom = incomingZoom;

    if (newZoom <= HUNDRED_PERCENT) {
      newZoom = HUNDRED_PERCENT;
    } else if (incomingZoom >= MAX_PERCENT) {
      newZoom = MAX_PERCENT;
    }

    if (newZoom !== zoom) this.setState({ zoom: newZoom });
  }

  fitToWidthHandler() {
    const {
      fitToWidth,
    } = this.state;

    this.setState({
      fitToWidth: !fitToWidth,
      zoom: HUNDRED_PERCENT,
    });
  }

  isPresentationAccessible() {
    const {
      currentSlide,
      slidePosition,
    } = this.props;
    // sometimes tomcat publishes the slide url, but the actual file is not accessible
    return currentSlide && slidePosition;
  }

  updateLocalPosition(x, y, width, height, zoom) {
    this.setState({
      localPosition: {
        x, y, width, height,
      },
      zoom,
    });
  }

  panAndZoomChanger(w, h, x, y) {
    const {
      currentSlide,
      podId,
      zoomSlide,
    } = this.props;

    zoomSlide(currentSlide.num, podId, currentSlide.presentationId, w, h, x, y);
  }

  renderOverlays(slideObj, svgDimensions, viewBoxPosition, viewBoxDimensions, physicalDimensions) {
    const {
      userIsPresenter,
      multiUser,
      podId,
      currentSlide,
      slidePosition,
    } = this.props;

    const {
      zoom,
      fitToWidth,
    } = this.state;

    if (!userIsPresenter && !multiUser) {
      return null;
    }

    // retrieving the pre-calculated data from the slide object
    const {
      width,
      height,
    } = slidePosition;

    return (
      <PresentationOverlayContainer
        podId={podId}
        userIsPresenter={userIsPresenter}
        currentSlideNum={currentSlide.num}
        slide={slideObj}
        slideWidth={width}
        slideHeight={height}
        viewBoxX={viewBoxPosition.x}
        viewBoxY={viewBoxPosition.y}
        viewBoxWidth={viewBoxDimensions.width}
        viewBoxHeight={viewBoxDimensions.height}
        physicalSlideWidth={physicalDimensions.width}
        physicalSlideHeight={physicalDimensions.height}
        svgWidth={svgDimensions.width}
        svgHeight={svgDimensions.height}
        zoom={zoom}
        zoomChanger={this.zoomChanger}
        updateLocalPosition={this.updateLocalPosition}
        panAndZoomChanger={this.panAndZoomChanger}
        getSvgRef={this.getSvgRef}
        fitToWidth={fitToWidth}
      />
    );
  }

  renderPresentationArea(svgDimensions, viewBoxDimensions) {
    const {
      intl,
      currentSlide,
      slidePosition,
      userIsPresenter,
    } = this.props;

    const { localPosition } = this.state;

    if (!this.isPresentationAccessible()) {
      return null;
    }

    const {
      width,
      height,
    } = slidePosition;

    const {
      imageUri,
      content,
      id,
    } = currentSlide;

    let viewBoxPosition;

    if (userIsPresenter && localPosition) {
      viewBoxPosition = {
        x: localPosition.x,
        y: localPosition.y,
      };
    } else {
      viewBoxPosition = {
        x: slidePosition.x,
        y: slidePosition.y,
      };
    }

    const widthRatio = viewBoxDimensions.width / width;
    const heightRatio = viewBoxDimensions.height / height;

    const physicalDimensions = {
      width: (svgDimensions.width / widthRatio),
      height: (svgDimensions.height / heightRatio),
    };

    const svgViewBox = `${viewBoxPosition.x} ${viewBoxPosition.y} `
      + `${viewBoxDimensions.width} ${Number.isNaN(viewBoxDimensions.height) ? 0 : viewBoxDimensions.height}`;

    const slideContent = content ? `${intl.formatMessage(intlMessages.slideContentStart)}
      ${content}
      ${intl.formatMessage(intlMessages.slideContentEnd)}` : intl.formatMessage(intlMessages.noSlideContent);

    return (
      <Fragment>
        <span id="currentSlideText" className={styles.visuallyHidden}>{slideContent}</span>
        <svg
          key={currentSlide.id}
          data-test="whiteboard"
          width={svgDimensions.width < 0 ? 0 : svgDimensions.width}
          height={svgDimensions.height < 0 ? 0 : svgDimensions.height}
          ref={(ref) => { if (ref != null) { this.svggroup = ref; } }}
          viewBox={svgViewBox}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svgStyles}
        >
          <defs>
            <clipPath id={id}>
              <rect x={viewBoxPosition.x} y={viewBoxPosition.y} width="100%" height="100%" fill="none" />
            </clipPath>
          </defs>
          <g clipPath={`url(${id})`}>
            <Slide
              imageUri={imageUri}
              svgWidth={width}
              svgHeight={height}
            />
          </g>
          {this.renderOverlays(
            currentSlide,
            svgDimensions,
            viewBoxPosition,
            viewBoxDimensions,
            physicalDimensions,
          )}
        </svg>
      </Fragment>
    );
  }

  renderPresentationTopToolbar() {
    const { fitToWidth, isFullscreen } = this.state;
    const { userIsPresenter, position } = this.props;

    return (
      <PresentationTopToolbarContainer
        fitToWidth={fitToWidth}
        isFullscreen={isFullscreen}
        fullscreenRef={this.refPresentationContainer}
        fitToWidthHandler={this.fitToWidthHandler}
        position={position}
        userIsPresenter={userIsPresenter}
      />
    );
  }

  renderPresentationBottomToolbar() {
    const {
      currentSlide,
      podId,
      position,
      userIsPresenter,
      presentationIsDownloadable,
      downloadPresentationUri,
    } = this.props;

    const { zoom } = this.state;

    if (!currentSlide) {
      return null;
    }

    return (
      <PresentationBottomToolbarContainer
        {...{
          zoom,
          podId,
          currentSlide,
        }}
        currentSlideNum={currentSlide.num}
        presentationId={currentSlide.presentationId}
        zoomChanger={this.zoomChanger}
        position={position}
        userIsPresenter={userIsPresenter}
        presentationIsDownloadable={presentationIsDownloadable}
        downloadPresentationUri={downloadPresentationUri}
      />
    );
  }

  renderPresentationDownload() {
    const { presentationIsDownloadable, downloadPresentationUri } = this.props;

    if (!presentationIsDownloadable) return null;

    const handleDownloadPresentation = () => {
      window.open(downloadPresentationUri);
    };

    return (
      <DownloadPresentationButton
        handleDownloadPresentation={handleDownloadPresentation}
        dark
      />
    );
  }

  renderPresentationFullscreen() {
    const {
      intl,
      userIsPresenter,
    } = this.props;
    const { isFullscreen } = this.state;

    if (userIsPresenter || !ALLOW_FULLSCREEN) return null;

    return (
      <FullscreenButtonContainer
        fullscreenRef={this.refPresentationContainer}
        elementName={intl.formatMessage(intlMessages.presentationLabel)}
        isFullscreen={isFullscreen}
        dark
        bottom
      />
    );
  }

  renderCurrentPresentationToast() {
    const {
      intl, currentPresentation, userIsPresenter, downloadPresentationUri,
    } = this.props;
    const { downloadable } = currentPresentation;

    return (
      <div className={styles.innerToastWrapper}>
        <div className={styles.toastIcon}>
          <div className={styles.iconWrapper}>
            <Icon iconName="presentation" />
          </div>
        </div>

        <div className={styles.toastTextContent} data-test="toastSmallMsg">
          <div>{`${intl.formatMessage(intlMessages.changeNotification)}`}</div>
          <div className={styles.presentationName}>{`${currentPresentation.name}`}</div>
        </div>

        {downloadable && !userIsPresenter
          ? (
            <span className={styles.toastDownload}>
              <div className={toastStyles.separator} />
              <a
                className={styles.downloadBtn}
                aria-label={`${intl.formatMessage(intlMessages.downloadLabel)} ${currentPresentation.name}`}
                href={downloadPresentationUri}
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage(intlMessages.downloadLabel)}
              </a>
            </span>
          ) : null
        }
      </div>
    );
  }

  render() {
    const { showSlide, localPosition } = this.state;
    const { userIsPresenter, slidePosition } = this.props;

    let viewBoxDimensions;

    if (userIsPresenter && localPosition) {
      viewBoxDimensions = {
        width: localPosition.width,
        height: localPosition.height,
      };
    } else if (slidePosition) {
      viewBoxDimensions = {
        width: slidePosition.viewBoxWidth,
        height: slidePosition.viewBoxHeight,
      };
    } else {
      viewBoxDimensions = {
        width: 0,
        height: 0,
      };
    }

    const svgDimensions = this.calculateSize(viewBoxDimensions);

    return (
      <div
        ref={(ref) => { this.refPresentationContainer = ref; }}
        className={styles.presentationContainer}
      >
        <div
          ref={(ref) => { this.refPresentationArea = ref; }}
          className={styles.presentationArea}
        >
          {showSlide
            ? this.renderPresentationTopToolbar()
            : null}

          <div
            className={styles.imgWrapperContainer}

          >
            <div
              className={styles.imgWrapper}
              ref={(ref) => { this.refimgWrapper = ref; }}
            >
              {showSlide
                ? this.renderPresentationArea(svgDimensions, viewBoxDimensions)
                : null}
            </div>
          </div>
          {showSlide
            ? this.renderPresentationBottomToolbar()
            : null}
        </div>
      </div>
    );
  }
}

export default injectIntl(withDraggableConsumer(withLayoutConsumer(PresentationArea)));
