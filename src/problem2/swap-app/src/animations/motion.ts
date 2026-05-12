export const pageFadeUp = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: 60,
    scale: 0.98,
  },
  transition: {
    duration: 0.5,
  },
};

export const modalBackdrop = {
  initial: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  animate: {
    opacity: 1,
    backdropFilter: "blur(4px)",
  },
  exit: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  transition: {
    duration: 0.2,
  },
};

export const modalContent = {
  initial: {
    opacity: 0,
    scale: 0.85,
    y: 30,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 30,
  },
  transition: {
    duration: 0.2,
  },
};
