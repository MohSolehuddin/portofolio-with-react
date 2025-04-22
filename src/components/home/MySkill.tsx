"use client";
import Image from "next/image";

export default function MySkill() {
  const techStack = [
    {
      name: "HTML5",
      logo: "https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white",
    },
    {
      name: "CSS3",
      logo: "https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white",
    },
    {
      name: "JavaScript",
      logo: "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
    },
    {
      name: "TypeScript",
      logo: "https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white",
    },
    {
      name: "Java",
      logo: "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white",
    },
    {
      name: "Apache Kafka",
      logo: "https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka",
    },
    {
      name: "Chart.js",
      logo: "https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white",
    },
    {
      name: "Expo",
      logo: "https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=%23D04A37",
    },
    {
      name: "Express.js",
      logo: "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB",
    },
    {
      name: "JWT",
      logo: "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens",
    },
    {
      name: "NPM",
      logo: "https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white",
    },
    {
      name: "NestJS",
      logo: "https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white",
    },
    {
      name: "Next JS",
      logo: "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white",
    },
    {
      name: "NodeJS",
      logo: "https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white",
    },
    {
      name: "Nodemon",
      logo: "https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD",
    },
    {
      name: "Nuxt JS",
      logo: "https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxt.js&logoColor=%2300DC82",
    },
    {
      name: "PNPM",
      logo: "https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220",
    },
    {
      name: "React",
      logo: "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
    },
    {
      name: "React Native",
      logo: "https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
    },
    {
      name: "React Query",
      logo: "https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white",
    },
    {
      name: "React Router",
      logo: "https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white",
    },
    {
      name: "React Hook Form",
      logo: "https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white",
    },
    {
      name: "Redux",
      logo: "https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white",
    },
    {
      name: "Spring",
      logo: "https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white",
    },
    {
      name: "TailwindCSS",
      logo: "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white",
    },
    {
      name: "tRPC",
      logo: "https://img.shields.io/badge/tRPC-%232596BE.svg?style=for-the-badge&logo=tRPC&logoColor=white",
    },
    {
      name: "Vite",
      logo: "https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white",
    },
    {
      name: "Vue.js",
      logo: "https://img.shields.io/badge/vue.js-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D",
    },
    {
      name: "Webpack",
      logo: "https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black",
    },
    {
      name: "Nginx",
      logo: "https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white",
    },
    {
      name: "Firebase",
      logo: "https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34",
    },
    {
      name: "MongoDB",
      logo: "https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white",
    },
    {
      name: "MySQL",
      logo: "https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white",
    },
    {
      name: "Postgres",
      logo: "https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white",
    },
    {
      name: "Realm",
      logo: "https://img.shields.io/badge/Realm-39477F?style=for-the-badge&logo=realm&logoColor=white",
    },
    {
      name: "SQLite",
      logo: "https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white",
    },
    {
      name: "Supabase",
      logo: "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white",
    },
    {
      name: "Hibernate",
      logo: "https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white",
    },
    {
      name: "Prisma",
      logo: "https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white",
    },
    {
      name: "Canva",
      logo: "https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white",
    },
    {
      name: "Figma",
      logo: "https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white",
    },
    {
      name: "Framer",
      logo: "https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue",
    },
    {
      name: "Git",
      logo: "https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white",
    },
    {
      name: "GitHub",
      logo: "https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white",
    },
    {
      name: "GitLab",
      logo: "https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white",
    },
    {
      name: "Docker",
      logo: "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white",
    },
    {
      name: "ESLint",
      logo: "https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white",
    },
    {
      name: "Postman",
      logo: "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white",
    },
    {
      name: "Swagger",
      logo: "https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white",
    },
    {
      name: "Trello",
      logo: "https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white",
    },
  ];

  return (
    <section className="min-h-screen max-md:p-1 max-xl:p-4 p-6 flex justify-center items-center flex-col">
      <h3 className="max-xl:text-4xl text-5xl font-extrabold mb-12 text-center text-navy dark:text-white">
        My Skill Set
      </h3>

      <div className="flex flex-wrap max-md:gap-1 max-xl:gap-1 gap-2 justify-center">
        {techStack.map((tech) => (
          <Image
            width={100}
            height={50}
            key={tech.name}
            loader={() => tech.logo}
            src={tech.logo}
            alt={tech.name}
            className="max-md:h-6 w-auto h-10"
          />
        ))}
      </div>
    </section>
  );
}
