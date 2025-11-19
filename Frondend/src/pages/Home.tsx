import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* ===================== HERO ===================== */}
      <section className="mt-30 relative flex flex-col items-center justify-center text-center h-[50vh] w-full theme-traiteur z-20 overflow-hidden px-6">
        {/* Dégradé basé sur ton thème */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary),var(--color-secondary))] " />

        {/* Texture */}
        <div className="absolute inset-0 bg-[url('/images/texture-noise.png')] opacity-10" />

        {/* CONTENU */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          src="/images/logo.png"
          alt="Logo Food Ynvést"
          className="relative z-10 h-40 w-auto object-contain mb-6 rounded-lg"
        />
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-5xl md:text-6xl font-serif mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          FOOD YNVEST
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative z-10 max-w-xl text-lg md:text-xl opacity-90"
          style={{ color: "var(--color-lightGold)" }}
        >
          Service traiteur professionnel & Cafétérias pour étudiants.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative z-10 flex gap-4 mt-8 flex-wrap"
        ></motion.div>
      </section>

      {/* ===================== BLOCS TRAITEUR / CAFÉ ===================== */}
      <section className="flex flex-col md:flex-row w-full ">
        {/* ===== BLOC TRAITEUR ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.03 }}
          className="flex-1 relative flex h-[420px] md:h-full  overflow-hidden shadow-2xl theme-traiteur"
        >
          <img
            src="/images/traiteur.jpg"
            className="w-full h-full object-cover "
          />

          {/* Overlay couleur thème TRAITEUR */}
          <div
            className="absolute inset-0 backdrop-blur-[1px]"
            style={{ backgroundColor: "rgba(74,31,41,0.45)" }} // var(--color-primary)
          />

          <div className="absolute  bottom-[50%] left-[25%] flex flex-col">
            <h2 className="text-white text-4xl md:text-5xl  font-extrabold mb-3 drop-shadow-xl">
              Traiteur B2B
            </h2>

            <Link
              to="/traiteur"
              className="px-6 py-2 rounded-full text-lg font-semibold transition text-center hover:scale-105"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "white",
              }}
            >
              Découvrir
            </Link>
          </div>
        </motion.div>

        {/* ===== BLOC CAFETERIAS ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          className="flex-1 relative flex h-[420px] md:h-full overflow-hidden shadow-2xl theme-cafe"
        >
          <img
            src="/images/cafeteria.jpg"
            className="w-full h-full object-cover"
          />

          {/* Overlay couleur thème CAFÉ */}
          <div
            className="absolute inset-0 backdrop-blur-[1px]"
            style={{ backgroundColor: "rgba(92,58,33,0.45)" }} // var(--color-primary café)
          />

          <div className="absolute  bottom-[50%] right-[25%] flex flex-col">
            <h2 className="text-white text-4xl md:text-5xl  font-extrabold mb-3 drop-shadow-xl">
              Nos Cafétérias
            </h2>

            <Link
              to="/cafeterias"
              className="px-6 py-2 rounded-full text-lg font-semibold transition text-center hover:scale-105"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "white",
              }}
            >
              Commander
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ===================== CTA END ===================== */}
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
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif mb-4"
        >
          Une solution pensée pour vos besoins
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-xl text-base md:text-lg opacity-80"
        >
          Cafétérias étudiantes, service traiteur professionnel, événements et
          plateaux repas : FOOD YNVEST accompagne entreprises, écoles et
          institutions.
        </motion.p>

        <Link
          to="/contact"
          className="mt-10 px-10 py-2 rounded-full text-lg font-semibold transition text-center hover:scale-105 bg-[#50741f] text-white"
        >
          Nous contacter
        </Link>
      </section>
    </div>
  );
};

export default Home;
