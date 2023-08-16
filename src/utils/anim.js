 // animation controls
 export const animVariant = {
    begin: {
      opacity: 0,
      y: -20,
    },

    end: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
      },
    },
  };

 export const childVariant = {
    begin: {
      opacity: 0,
      y: -20,
    },

    end: {
      opacity: 1,
      y: 0,
    },
  };