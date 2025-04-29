import Link from "next/link";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
export default function SocialMedia() {
  return (
    <section className="social-media flex justify-center items-center gap-6 text-3xl text-navy dark:text-white max-xl:text-xl">
      <Link
        href="https://github.com/MohSolehuddin"
        target="_blank"
        aria-label="Github Moh Solehuddin">
        <FaGithub />
      </Link>
      <Link
        href="https://www.tiktok.com/@msytcode"
        target="_blank"
        aria-label="Tiktok Moh Solehuddin">
        <FaTiktok />
      </Link>
      <Link
        href="https://www.instagram.com/msytc"
        target="_blank"
        aria-label="Instagram Moh Solehuddin">
        <FaInstagram />
      </Link>
    </section>
  );
}
