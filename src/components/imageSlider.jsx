import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ImageSlider(props) {
    const images = props.images;
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
            <div className="w-full max-w-xl aspect-square rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeIndex}
                        src={images[activeIndex]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full object-contain p-4"
                    />
                </AnimatePresence>
            </div>

            <div className="w-full flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4">
                {
                    images.map(
                        (image, index) => {
                            return (
                                <img
                                    key={index}
                                    src={images[index]}
                                    className={
                                        "w-16 h-16 sm:w-20 sm:h-20 lg:w-[90px] lg:h-[90px] object-cover rounded-lg border-2 cursor-pointer transition-colors " +
                                        ((activeIndex == index)
                                            ? "border-cyan-400"
                                            : "border-white/10 hover:border-cyan-400/40")
                                    }
                                    onClick={
                                        () => {
                                            setActiveIndex(index)
                                        }
                                    }
                                />
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}