import { motion } from "framer-motion";
import { envelope } from "../Assets";

function DMail() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className=" mt-[70px] md:mt-[130px] px-small md:px-[40px] xl:px-Large rounded-sm"
    >
<<<<<<< HEAD

        <div className=' md:flex gap-5'>
            <div className=' lg:mt-[30px] lg:h-[350px] xl:min-w-[630px] max-w-[750px] bg-secondary-color py-10 px-5' >
              <h1 className='  --accent-color text font-extrabold text-3xl xl:text-7xl mb-2'>Harness your ID <br /> with D-Mail</h1>
              <p className='text-left mt-6 font-normal md:text-xl '>
                "Introducing our Blockchain Mail Service, where secure identities from our Blockchain Name Service converge with encrypted communications to ensuring your messages are safe and trusted."
              </p> 
            </div>
            
            <img src={envelope} alt="envelope" className=' animate-bounce duration-10 mx-auto md:h-[400px] md:mt-[50px] h-[200px]' />
=======
      <div className=" md:flex gap-5">
        <div className=" lg:mt-[30px] lg:h-[350px] xl:min-w-[630px] border-2 max-w-[750px] bg-secondary-color py-10 px-5">
          <h1 className="  --accent-color text font-extrabold text-3xl xl:text-7xl mb-2">
            Harness your ID <br /> with D-Mail
          </h1>
          <p className="text-left mt-6 font-normal md:text-xl ">
            &quot;Introducing our Blockchain Mail Service, where secure
            identities from our Blockchain Name Service converge with encrypted
            communications to ensuring your messages are safe and trusted.&quot;
          </p>
>>>>>>> c4d26f4c3f7669d019984110f081600884b4a54b
        </div>

        <img
          src={envelope}
          alt="envelope"
          className=" animate-bounce duration-10 mx-auto md:h-[400px] md:mt-[50px] h-[200px]"
        />
      </div>
    </motion.div>
  );
}

export default DMail;
