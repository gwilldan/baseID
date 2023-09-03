import { motion } from "framer-motion";

const LoadingDot = {
  display: "block",
  width: "1.8rem",
  height: "1.8rem",
  borderRadius: "50%",
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around",
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.5,
  repeatType: "mirror",
  repeat: Infinity,
  ease: "linear",
};

export default function Loader() {
  return (
    <div
      style={{
        paddingTop: "5rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
          className="bg-priBlue"
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
          className="bg-priBlue"
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
          className="bg-priBlue"
        />
      </motion.div>
    </div>
  );
}
