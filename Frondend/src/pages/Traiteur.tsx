/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type FC, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import traiteurData from "../data/traiteur.json";

/* ============================================================
   CAROUSEL FULLSCREEN (STYLE IDENTIQUE)
============================================================ */

const heroPhotos = [
  "/images/traiteur/hero1.jpg",
  "/images/traiteur/hero2.jpg",
  "/images/traiteur/hero3.jpg",
  "/images/traiteur/hero4.jpg",
];

const HeroCarousel: FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroPhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden ">
      {heroPhotos.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="absolute inset-0 flex flex-col items-center gap-10 justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-5xl md:text-7xl font-extrabold drop-shadow-2xl"
        >
          Traiteur{" "}
          <span className="mt-3 block md:text-9xl text-gold ">FOOD YNVEST</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-white text-lg md:text-2xl mt-6 max-w-2xl"
        >
          Une expérience culinaire pensée pour les entreprises et institutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a
            href="#catalogue"
            className=" px-10 py-3 bg-[#50741f] text-white rounded-full text-xl font-semibold hover:scale-105 transition"
          >
            Voir nos produits
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   CAROUSEL PRODUIT (Identique à ton style)
============================================================ */

interface CarouselProps {
  photos: Array<string | undefined>;
}

const Carousel: FC<CarouselProps> = ({ photos }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-xl shadow-lg">
      {photos.map((src, i) =>
        src ? (
          <motion.img
            key={i}
            src={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null
      )}

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

/* ============================================================
   MODAL PRODUIT (Identique à ton modal Cafeterias)
============================================================ */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const ProductModal: FC<ModalProps> = ({ isOpen, onClose, product }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 max-md:items-end"
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg p-6 shadow-2xl md:rounded-2xl max-md:rounded-t-3xl max-md:h-[90vh] max-md:overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl"
            >
              ×
            </button>

            {product.photos && <Carousel photos={product.photos} />}

            <h3 className="text-3xl font-bold text-[#4a1f29] mt-6">
              {product.nom}
            </h3>

            {product.prix && (
              <p className="text-xl text-[#50741f] font-semibold mt-3">
                {product.prix.toFixed(2)} €
              </p>
            )}

            {product.description && (
              <p className="text-gray-700 mt-4">{product.description}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   CATALOGUE DYNAMIQUE
============================================================ */

const Catalogue: FC = () => {
  const categories = Object.keys(traiteurData) as Array<
    keyof typeof traiteurData
  >;
  const [currentCategory, setCurrentCategory] = useState<
    keyof typeof traiteurData | null
  >(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <section id="catalogue" className="py-20 px-6 md:px-16 bg-gray-50">
      <h2 className="text-center text-5xl font-extralight text-[#d8b56a] mb-12">
        Nos Produits Traiteur
      </h2>

      {/* CATEGORIES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat}
            onClick={() => setCurrentCategory(cat)}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer bg-white shadow-xl rounded-2xl p-6 text-center"
          >
            <h3 className="text-xl font-semibold capitalize">
              {cat.replace(/_/g, " ")}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* PRODUITS */}
      {currentCategory && (
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6 capitalize text-[#4a1f29]">
            {currentCategory.replace(/_/g, " ")}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(traiteurData[currentCategory])
              .flat()
              .map((product: any, i: number) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer bg-white shadow-lg rounded-2xl p-5"
                >
                  <h4 className="text-xl font-semibold">{product.nom}</h4>

                  {product.prix && (
                    <p className="text-[#50741f] mt-2 font-bold">
                      {product.prix.toFixed(2)} €
                    </p>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      )}

      <ProductModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </section>
  );
};

/* ============================================================
   FORMULAIRE B2B EMAILJS (Style identique)
============================================================ */

const Formulaire = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs.sendForm("serviceID", "templateID", formRef.current!, "publicKey");
  };

  return (
    <section className="flex z-20 flex-col items-center justify-center text-center py-20 px-6 theme-traiteur bg-[radial-gradient(ellipse_at_center,var(--color-secondary-green),var(--color-secondary-green-light))]">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-8xl font-extrabold text-[#d8b56a] mb-12 drop-shadow-xl"
      >
        Demander un devis
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        ref={formRef}
        onSubmit={sendEmail}
        className="
      w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 
      p-8 rounded-3xl backdrop-blur-xl bg-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)]
    "
      >
        <input
          name="entreprise"
          placeholder="Nom de l’entreprise"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="nom"
          placeholder="Nom complet"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="email"
          placeholder="Email professionnel"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="telephone"
          placeholder="Téléphone"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          name="adresse"
          placeholder="Adresse de livraison"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          type="date"
          name="date"
          className="inputModern col-span-2 bg-amber-50"
        />
        <input
          type="number"
          name="personnes"
          placeholder="Nombre de personnes"
          className="inputModern col-span-2 bg-amber-50"
        />

        <textarea
          name="message"
          placeholder="Message / Besoins spécifiques"
          className="inputModern col-span-2 bg-amber-50 h-32"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="
        mt-6 col-span-2 bg-[#50741f] text-white py-3 rounded-xl 
        text-xl font-semibold shadow-lg transition
      "
        >
          Envoyer la demande
        </motion.button>
      </motion.form>
    </section>
  );
};

/* ============================================================
   PAGE FINALE TRAITEUR
============================================================ */

const Traiteur = () => {
  return (
    <div className="w-full min-h-screen flex flex-col mt-25">
      <HeroCarousel />
      <Catalogue />
      <Formulaire />
    </div>
  );
};

export default Traiteur;
