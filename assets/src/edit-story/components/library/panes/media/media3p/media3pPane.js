/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import styled from 'styled-components';
import { useLayoutEffect, useState } from 'react';

/**
 * Internal dependencies
 */
import MediaGallery from '../mediaGallery';
import { Pane } from '../../shared';
import paneId from './paneId';

const StyledPane = styled(Pane)`
  height: 100%;
  padding: 0;
  overflow: hidden;
`;

const Container = styled.div`
  overflow: scroll;
  height: 100%;
  padding: 0 1.5em 0 1.5em;
  margin-top: 1em;
`;

// TODO(#2368): get resources from useMedia
const resources = [
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 18,
    height: 12,
    src:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/how_to_brush_dogs_teeth_slideshow/1800x1200_how_to_brush_dogs_teeth_slideshow.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 128,
    height: 72,
    src:
      'https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=cnRk0HYq',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 110,
    height: 62,
    src:
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 79,
    height: 59,
    src: 'https://www.abc.net.au/cm/rimage/11779952-4x3-xlarge.jpg?v=3',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 18,
    height: 12,
    src:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/how_to_brush_dogs_teeth_slideshow/1800x1200_how_to_brush_dogs_teeth_slideshow.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 218,
    height: 278,
    src:
      'https://i0.wp.com/rollinsps.vic.edu.au/wp-content/uploads/2018/11/IMG_0451.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 1100,
    height: 825,
    src:
      'https://i.insider.com/5d2e0e30a17d6c5cfd30be94?width=1100&format=jpeg&auto=webp',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 591,
    height: 555,
    src: 'https://www.dogsnsw.org.au/media/1007/breeding-dogs.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 640,
    height: 635,
    src:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 1100,
    height: 825,
    src:
      'https://i.insider.com/5d2e0e30a17d6c5cfd30be94?width=1100&format=jpeg&auto=webp',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 18,
    height: 12,
    src:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/how_to_brush_dogs_teeth_slideshow/1800x1200_how_to_brush_dogs_teeth_slideshow.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 320,
    height: 400,
    src:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Declassified_image_of_Conan%2C_the_dog_who_chased_al-Baghdadi.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 1100,
    height: 825,
    src:
      'https://i.insider.com/5d2e0e30a17d6c5cfd30be94?width=1100&format=jpeg&auto=webp',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 480,
    height: 720,
    src:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bernese-mountain-dog-royalty-free-image-1581013857.jpg?crop=0.87845xw:1xh;center,top&resize=480:*',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 640,
    height: 640,
    src:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/smartest-dog-breeds-lead-1587757081.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 320,
    height: 400,
    src:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Declassified_image_of_Conan%2C_the_dog_who_chased_al-Baghdadi.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 591,
    height: 555,
    src: 'https://www.dogsnsw.org.au/media/1007/breeding-dogs.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 640,
    height: 635,
    src:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 1100,
    height: 825,
    src:
      'https://i.insider.com/5d2e0e30a17d6c5cfd30be94?width=1100&format=jpeg&auto=webp',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 18,
    height: 12,
    src:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/how_to_brush_dogs_teeth_slideshow/1800x1200_how_to_brush_dogs_teeth_slideshow.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 320,
    height: 400,
    src:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Declassified_image_of_Conan%2C_the_dog_who_chased_al-Baghdadi.jpg',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 1100,
    height: 825,
    src:
      'https://i.insider.com/5d2e0e30a17d6c5cfd30be94?width=1100&format=jpeg&auto=webp',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 480,
    height: 720,
    src:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bernese-mountain-dog-royalty-free-image-1581013857.jpg?crop=0.87845xw:1xh;center,top&resize=480:*',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 640,
    height: 640,
    src:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/smartest-dog-breeds-lead-1587757081.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*',
  },
  {
    id: 1,
    type: 'image',
    local: false,
    alt: 'image alt',
    mimeType: 'image/jpeg',
    width: 320,
    height: 400,
    src:
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Declassified_image_of_Conan%2C_the_dog_who_chased_al-Baghdadi.jpg',
  },
];

/**
 * Pane that contains the media 3P integrations.
 *
 * @param {Object} props Component props
 * @return {*} The media pane element for 3P integrations.
 */
function Media3pPane(props) {
  // TODO(#1698): Ensure scrollbars auto-disappear in MacOS.
  // State and callback ref necessary to recalculate the padding of the list
  //  given the scrollbar width.
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  let container = null;
  const refContainer = (element) => {
    if (!element) {
      return;
    }
    container = element;
    setScrollbarWidth(element.offsetWidth - element.clientWidth);
  };

  // Recalculates padding of Media Pane so it stays centered.
  // As of May 2020 this cannot be achieved without js (as the scrollbar-gutter
  // prop is not yet ready).
  useLayoutEffect(() => {
    if (!scrollbarWidth) {
      return;
    }
    const currentPaddingLeft = parseFloat(
      window.getComputedStyle(container, null).getPropertyValue('padding-left')
    );
    container.style['padding-right'] =
      currentPaddingLeft - scrollbarWidth + 'px';
  }, [scrollbarWidth, container]);

  // Callback for when a media element is selected.
  const onInsert = () => {};

  return (
    <StyledPane id={paneId} {...props}>
      <Container ref={refContainer}>
        <MediaGallery
          resources={resources}
          onInsert={onInsert}
          isMedia3p={true}
        />
      </Container>
    </StyledPane>
  );
}

export default Media3pPane;
