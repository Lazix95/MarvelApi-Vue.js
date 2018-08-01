<template>

  <div class="hamburger hamburger--collapse" :class="{'is-active': !isActive}" type="button">
  <span class="hamburger-box">
    <span class="hamburger-inner"></span>
  </span>
</div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  props: {
    isActive: Boolean
  }
};
</script>

<style lang="less">
@hamburger-padding-x: 15px;
@hamburgerPaddingY: 15px;
@hamburger-layer-width: 30px;
@hamburger-layer-height: 4px;
@hamburger-layer-spacing: 6px;
@hamburger-layer-color: #000000;
@hamburger-layer-border-radius: 4px;
@hamburger-hover-opacity: 0.7;
@hamburger-hover-transition-duration: 0.15s;
@hamburger-hover-transition-timing-function: linear;
@hamburger-hover-use-filter: false;
@hamburger-hover-filter: opacity(50%);

.hamburger--collapse .hamburger-inner {
  top: auto;
  bottom: 0;
  transition-duration: 0.13s;
  transition-delay: 0.13s;
  transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.hamburger--collapse .hamburger-inner::after {
  top: -20px;
  transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    opacity 0.1s linear;
}
.hamburger--collapse .hamburger-inner::before {
  transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.hamburger--collapse.is-active .hamburger-inner {
  transform: translate3d(0, -10px, 0) rotate(-45deg);
  transition-delay: 0.22s;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
.hamburger--collapse.is-active .hamburger-inner::after {
  top: 0;
  opacity: 0;
  transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
    opacity 0.1s 0.22s linear;
}
.hamburger--collapse.is-active .hamburger-inner::before {
  top: 0;
  transform: rotate(-90deg);
  transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
    transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.hamburger {
  padding: @hamburger-padding-x @hamburgerPaddingY;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;

  // &:hover {
  // @if @hamburger-hover-use-filter == true {
  //  filter: @hamburger-hover-filter;
  // } @else {
  // opacity: @hamburger-hover-opacity;
  //  }
  // }
}

.hamburger-box {
  width: @hamburger-layer-width;
  height: @hamburger-layer-width;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: @hamburger-layer-height / -2;

  &,
  &::before,
  &::after {
    width: @hamburger-layer-width;
    height: @hamburger-layer-height;
    background-color: @hamburger-layer-color;
    border-radius: @hamburger-layer-border-radius;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }

  &::before,
  &::after {
    content: "";
    display: block;
  }

  &::before {
    top: (@hamburger-layer-spacing + @hamburger-layer-height) * -1;
  }

  &::after {
    bottom: (@hamburger-layer-spacing + @hamburger-layer-height) * -1;
  }
}

/*
   * Collapse
   */
.hamburger--collapse {
  .hamburger-inner {
    top: auto;
    bottom: 0;
    transition-duration: 0.13s;
    transition-delay: 0.13s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

    &::after {
      top: (@hamburger-layer-spacing * 2 + @hamburger-layer-height * 2) * -1;
      transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
        opacity 0.1s linear;
    }

    &::before {
      transition: top 0.12s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
        transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
  }

  &.is-active {
    .hamburger-inner {
      transform: translate3d(
          0,
          (@hamburger-layer-spacing + @hamburger-layer-height) * -1,
          0
        )
        rotate(-45deg);
      transition-delay: 0.22s;
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

      &::after {
        top: 0;
        opacity: 0;
        transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
          opacity 0.1s 0.22s linear;
      }

      &::before {
        top: 0;
        transform: rotate(-90deg);
        transition: top 0.1s 0.16s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
          transform 0.13s 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }
  }
}
</style>
