import Link from "next/link";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
export default function SocialMedia() {
  return (
    <section className="social-media flex justify-center items-center gap-6 text-3xl text-navy dark:text-white">
      <Link href="https://github.com/MohSolehuddin" target="_blank">
        <FaGithub />
      </Link>
      <Link href="https://www.tiktok.com/@msytcode" target="_blank">
        <FaTiktok />
      </Link>
      <Link href="https://www.instagram.com/msytc" target="_blank">
        <FaInstagram />
      </Link>
    </section>
  );
}
