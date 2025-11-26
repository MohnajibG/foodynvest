import { useState, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ===================== MODAL =====================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  horaires: string;
  adresse: string;
  menu: string;
  photos: Array<string | undefined>;
}

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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-bold text-[#4a1f29] mb-4">{title}</h3>

            <div className="space-y-3 text-gray-700">
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

              <div className="grid grid-cols-2 gap-3 mt-4">
                {photos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-full h-28 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            </div>

            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
              onClick={onClose}
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ===================== PAGE CAFETERIAS =====================
const Cafeterias = () => {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  return (
    <div className="flex flex-col w-full mt-50">
      <h2 className="text-[#d8b56a] my-30 text-4xl md:text-8xl font-extralight text-center mb-4 drop-shadow-xl">
        Nos Cafétérias
      </h2>

      <section className="flex flex-col md:flex-row w-full gap-5 px-6 md:px-16 py-16">
        {/* COMPUS A */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => setOpenA(true)}
          className="cursor-pointer flex-1 relative flex h-[420px] overflow-hidden shadow-2xl rounded-2xl"
        >
          <img
            src="/images/compusa.jpg"
            className="w-full h-full object-cover"
          />

          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{ backgroundColor: "rgba(74,31,41,0.45)" }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-xl">
              Compus A
            </h2>
          </div>
        </motion.div>

        {/* COMPUS B */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => setOpenB(true)}
          className="cursor-pointer flex-1 relative flex h-[420px] overflow-hidden shadow-2xl rounded-2xl"
        >
          <img
            src="/images/compusb.jpg"
            className="w-full h-full object-cover"
          />

          <div
            className="absolute inset-0 backdrop-blur-[2px]"
            style={{ backgroundColor: "rgba(92,58,33,0.45)" }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-xl">
              Compus B
            </h2>
          </div>
        </motion.div>
      </section>

      {/* ===================== CTA PRECOMMANDES ===================== */}
      <section
        className="flex z-20 flex-col items-center justify-center text-center py-16 px-6 theme-traiteur bg-[radial-gradient(ellipse_at_center,var(--color-secondary-green),var(--color-secondary-green-light))]"
        style={{
          backgroundColor: "var(--color-secondary-green)",
          color: "var(--color-bg)",
        }}
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight"
        >
          <span className="block text-6xl">Nouveau</span>
          précommandez vos repas
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-xl text-base md:text-lg opacity-90 leading-relaxed"
        >
          Vous pouvez désormais réserver vos repas jusqu’à
          <span className="font-semibold"> 7 jours en avance </span>
          dans votre cafétéria.
        </motion.p>

        <Link
          to="/cafeterias"
          className="mt-10 px-10 py-2 rounded-full text-lg font-semibold transition hover:scale-105 bg-[#50741f] text-white"
        >
          Précommander
        </Link>
      </section>

      {/* ===================== MODALS ===================== */}

      <Modal
        isOpen={openA}
        onClose={() => setOpenA(false)}
        title="Compus A"
        horaires="Lundi au vendredi : 8h - 17h"
        adresse="12 Avenue Gustave Eiffel, Bezons"
        menu="Poulet rôti, salade veggie, pâtes bolognaise, dessert du jour."
        photos={[
          "/images/compusa.jpg",
          "/images/compusa.jpg",
          "/images/compusa.jpg",
          "/images/compusa.jpg",
        ]}
      />

      <Modal
        isOpen={openB}
        onClose={() => setOpenB(false)}
        title="Compus B"
        horaires="Lundi au vendredi : 8h - 18h"
        adresse="5 Rue des Étudiants, Courbevoie"
        menu="Wrap poulet, bowl saumon, lasagnes maison, fruit frais."
        photos={[
          "/images/compusb.jpg",
          "/images/compusb.jpg",
          "/images/compusb.jpg",
          "/images/compusb.jpg",
        ]}
      />
    </div>
  );
};

export default Cafeterias;
