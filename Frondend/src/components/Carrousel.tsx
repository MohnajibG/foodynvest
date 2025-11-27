import { type FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  horaires: string;
  adresse: string;
  menu: string;
  photos: Array<string | undefined>;
}

/* ========================= CAROUSEL ========================= */

const Carousel: FC<{ photos: Array<string | undefined> }> = ({ photos }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-xl shadow-lg">
      {photos.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ========================= MODAL ========================= */

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  horaires,
  adresse,
  menu,
  photos,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 bg-black/50 backdrop-blur-sm 
            flex items-center justify-center z-50 
            max-md:items-end
          "
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="
              bg-white shadow-2xl w-full max-w-lg p-6 relative 
              md:rounded-2xl 
              max-md:rounded-t-2xl max-md:h-[90vh] max-md:overflow-y-auto
            "
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BTN */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl"
              onClick={onClose}
            >
              ×
            </button>

            {/* CAROUSEL */}
            <Carousel photos={photos} />

            <h3 className="text-3xl font-bold text-[#4a1f29] mt-6 mb-4">
              {title}
            </h3>

            <div className="space-y-4 text-gray-700 pb-10">
              <p>
                <span className="font-semibold">Horaires :</span>
                <br />
                {horaires}
              </p>

              <p>
                <span className="font-semibold">Adresse :</span>
                <br />
                {adresse}
              </p>

              <p>
                <span className="font-semibold">Menu du jour :</span>
                <br />
                {menu}
              </p>
            </div>

            <div className="text-center">
              <Link
                to="/precommande"
                className="mt-6 inline-block px-6 py-2 rounded-full text-lg font-semibold transition hover:scale-105 bg-[#50741f] text-white"
              >
                Précommander
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
