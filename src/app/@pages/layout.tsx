"use client";
import Button from "@/components/Button/Button";
import { imagePath } from "@/utils/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { LiaBookSolid } from "react-icons/lia";

// Лэйаут страниц
// (верхний уровень страниц, код страниц передается автоматически через children)
const Layout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname(); // получение пути текущей страницы
  const router = useRouter(); // получение переменной для навигации

  // Конфигурация анимации появления контента на странице
  const variants = {
    hidden: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="h-full relative w-full">
        {/* Шапка страницы везде кроме страницы авторизации */}
        {pathname.split("/").splice(-1)[0] !== "signin" && (
          <header className="bg-white px-5 shadow-[0_4px_200px_rgba(56,86,128,0.12)]">
            <div className="py-4 flex w-full flex-col md:flex-row justify-between items-center gap-4 md:gap-20 container mx-auto">
              <div className="relative overflow-visible">
                <Link
                  href="/catalog"
                  className="text-2xl md:text-3xl font-bold text-black flex flex-col-reverse sm:flex-row items-center gap-1 sm:gap-4 relative z-20 text-center"
                >
                  <svg
                    className="w-[120px] h-auto text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="229"
                    height="75"
                    viewBox="0 0 229 75"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1482_248)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M117.471 55.7937V44.5584C117.374 44.4623 117.277 44.4623 117.277 44.4623L112.908 45.0387V46.191L114.753 46.6711L114.753 54.7375C114.17 55.1215 113.588 55.3138 113.005 55.6016C112.423 55.794 111.84 55.8899 111.452 55.8899C110.676 55.8899 110.19 55.6976 109.802 55.3135C109.511 54.9296 109.316 54.2573 109.316 53.3931C109.316 51.9528 109.316 50.5122 109.316 49.0718C109.316 47.6315 109.316 46.191 109.316 44.7505L109.122 44.6544L104.754 45.2307L104.753 46.3828C105.045 46.4789 105.336 46.5748 105.627 46.6711C105.918 46.7669 106.21 46.863 106.501 46.9589V54.7373C106.501 56.0818 106.792 57.0422 107.471 57.5223C108.151 58.0984 109.025 58.2905 110.19 58.2905C110.578 58.2905 110.966 58.2905 111.452 58.1944C111.937 58.0983 112.423 58.0983 112.811 58.0022C113.491 57.4259 114.073 56.8499 114.753 56.1776C114.753 56.1776 114.753 56.1776 114.85 56.1776L115.433 58.0982L115.627 58.1943L119.607 57.6179V56.4656C119.219 56.3696 118.927 56.2737 118.539 56.2737C118.151 55.9859 117.762 55.89 117.471 55.7937ZM46.5999 62.516C53.59 61.8438 59.512 55.7937 62.0362 47.4391C62.1333 47.1511 61.9393 46.8629 61.648 46.7671H61.5509C56.7939 46.0947 51.7455 45.6146 46.5999 45.6146C46.3088 45.6146 46.0172 45.9026 46.0172 46.191V62.036C45.9203 62.228 46.2118 62.516 46.5999 62.516ZM83.2008 25.064C82.9096 24.872 82.5213 24.7761 82.2299 24.9681C77.473 27.657 71.2597 29.7697 64.1727 31.1141C63.6874 31.21 63.4929 31.594 63.4929 32.0743C63.8811 34.091 64.0756 36.1076 64.0756 38.2201C64.0756 40.525 63.8811 42.8296 63.3959 44.9422C63.2989 45.4223 63.5904 45.8064 64.0756 45.9025C70.9684 47.2468 77.0848 49.2636 81.7447 51.8563C82.0359 52.0484 82.4243 51.9524 82.6184 51.7603C87.2787 47.8229 89.7057 43.1177 89.7057 38.2199C89.8995 33.4185 87.5694 28.9053 83.2008 25.064ZM139.995 39.3725C139.606 39.7565 139.412 40.1408 139.412 40.717C139.412 41.1972 139.606 41.6773 139.897 42.0616C140.189 42.4458 140.674 42.6378 141.257 42.6378C141.839 42.6378 142.227 42.4458 142.616 42.0616C143.004 41.6773 143.198 41.1972 143.101 40.717C143.101 40.2369 142.907 39.7569 142.616 39.3725C142.228 38.9883 141.839 38.7963 141.257 38.7963C140.868 38.7966 140.383 38.9883 139.995 39.3725ZM142.81 50.2241C142.81 48.3035 142.81 46.3827 142.81 44.4623L142.616 44.3662L138.247 45.0385V46.1908C138.538 46.2868 138.829 46.3828 139.121 46.4788C139.412 46.5747 139.703 46.6711 139.994 46.7669V55.9861L137.956 56.7542C137.956 57.1385 137.956 57.5225 138.053 57.8105L144.848 57.8103C144.848 57.6183 144.848 57.4263 144.848 57.2341C144.848 57.0418 144.848 56.8499 144.848 56.6579L142.81 55.9857C142.81 54.0654 142.81 52.1446 142.81 50.2241ZM158.149 44.6543L156.693 44.7503C156.208 44.7503 155.625 44.7503 155.237 44.8462C154.752 44.8462 154.46 44.8462 154.266 44.8462V45.999L155.916 46.575C155.819 46.6711 155.722 46.9593 155.625 47.3433C155.528 47.7275 155.334 48.2076 155.14 48.7837C154.946 49.36 154.751 49.9363 154.557 50.5121L153.975 52.2408C153.78 52.817 153.586 53.2972 153.489 53.6811C153.392 53.9692 153.295 54.1612 153.198 54.4493L153.1 54.449L150.576 47.7269C150.382 47.2468 150.188 46.6705 150.091 46.1904C149.994 45.7104 149.897 45.2301 149.8 44.7501L145.334 44.9423V46.0947L146.693 46.5747C147.179 47.631 147.664 48.7834 148.052 49.8396C148.344 50.608 148.732 51.4722 149.12 52.4325C149.509 53.2967 149.897 54.1608 150.188 55.0252C150.479 55.7934 150.771 56.5615 151.062 57.1377C151.353 57.714 151.45 58.098 151.547 58.2902L153.198 57.9061L156.596 49.8395C156.984 48.9755 157.372 48.2072 157.761 47.5347C158.149 46.8626 158.634 46.3824 159.217 45.9023L159.12 44.75C158.926 44.5584 158.634 44.5584 158.149 44.6543ZM183.1 44.1742C182.614 44.1742 182.226 44.2703 181.838 44.3662C181.449 44.4623 181.061 44.6543 180.673 44.9424C180.285 45.1345 179.993 45.4225 179.605 45.6147C179.314 45.9027 179.023 46.0948 178.731 46.3828L178.634 46.3827L178.148 44.5583L177.954 44.4622L174.071 45.0386V46.1909L175.915 46.671V55.8899L173.877 56.658L173.974 57.8105L180.769 57.8104V56.658L178.731 56.0818L178.731 47.5349L183.003 47.8229C183.294 47.4389 183.488 47.0548 183.682 46.5747C183.876 46.0946 183.876 45.7104 183.876 45.2299C183.876 44.8459 183.779 44.6539 183.682 44.4618C183.488 44.2703 183.294 44.1742 183.1 44.1742ZM193.973 51.4726C193.585 51.0883 193.196 50.8963 192.711 50.6083C192.128 50.3203 191.643 50.0321 191.061 49.8402C190.575 49.6478 190.09 49.4559 189.701 49.2638C189.41 49.1679 189.022 48.9759 188.73 48.7834C188.439 48.5915 188.342 48.4956 188.148 48.3035C188.051 48.1114 187.954 47.9194 187.954 47.6314C187.954 47.1511 188.148 46.7671 188.439 46.479C188.827 46.191 189.216 46.0948 189.798 46.0948C190.089 46.0948 190.478 46.1909 190.769 46.1909C191.157 46.2868 191.546 46.4789 192.031 46.671L193.002 48.7833L193.973 48.6875C193.973 48.1113 193.973 47.5351 193.973 46.959C193.973 46.3827 193.973 45.8064 193.973 45.2306C193.293 44.8462 192.613 44.6543 191.837 44.4622C191.157 44.3661 190.478 44.2699 189.798 44.2699C188.925 44.2699 188.148 44.366 187.565 44.5579C186.983 44.75 186.497 45.0381 186.109 45.3261C185.721 45.7103 185.429 46.0945 185.236 46.4785C185.041 46.9585 184.944 47.3427 184.944 47.8229C184.944 48.3992 185.041 48.8793 185.333 49.2636C185.527 49.6476 185.915 50.0319 186.303 50.3198C186.692 50.6079 187.177 50.896 187.663 51.088L189.119 51.7605C189.507 51.9525 189.896 52.1445 190.187 52.2406C190.478 52.4328 190.769 52.5284 191.06 52.7206C191.352 52.9127 191.546 53.1048 191.643 53.2968C191.74 53.4889 191.837 53.7768 191.837 54.161C191.837 54.7372 191.546 55.2173 191.06 55.5053C190.575 55.7936 189.895 55.8896 189.119 55.8896C188.73 55.8896 188.342 55.7937 187.857 55.6973C187.371 55.6012 186.983 55.4095 186.595 55.1211L185.429 52.7204C185.235 52.7204 185.138 52.8164 184.944 52.8164C184.75 52.8164 184.653 52.9125 184.459 52.9125L184.653 56.6574C185.139 56.9454 185.818 57.2337 186.595 57.3297C187.371 57.5218 188.245 57.6177 189.022 57.6177C189.993 57.6177 190.866 57.5216 191.546 57.3297C192.226 57.1376 192.808 56.8494 193.293 56.4654C193.779 56.0814 194.07 55.6973 194.264 55.2172C194.458 54.7369 194.556 54.1609 194.556 53.6809C194.556 53.1046 194.458 52.6245 194.264 52.2405C194.556 52.1446 194.361 51.8567 193.973 51.4726ZM200.283 42.5418C200.866 42.5418 201.254 42.3494 201.643 41.9654C202.031 41.5813 202.225 41.1014 202.128 40.6208C202.128 40.1408 201.934 39.6607 201.643 39.2765C201.254 38.8925 200.866 38.7002 200.283 38.7002C199.798 38.7002 199.313 38.8926 199.021 39.2765C198.633 39.6607 198.439 40.0448 198.439 40.6208C198.439 41.1009 198.633 41.5812 198.924 41.9654C199.313 42.3496 199.798 42.5418 200.283 42.5418ZM201.837 50.2241C201.837 48.3035 201.837 46.3827 201.837 44.4623L201.643 44.3662L197.274 45.0385V46.1908C197.565 46.2868 197.856 46.3828 198.148 46.4788C198.439 46.5747 198.73 46.6711 199.021 46.7669V55.9861L196.983 56.7542C196.983 56.9464 196.983 57.1385 196.983 57.3304C196.983 57.5226 196.983 57.7147 196.983 57.9067L203.779 57.9065C203.779 57.7143 203.779 57.5223 203.779 57.3302C203.779 57.1383 203.779 56.9462 203.779 56.754L201.74 56.0818C201.837 54.0654 201.837 52.1446 201.837 50.2241ZM213.972 55.6015C213.39 55.6976 212.904 55.7939 212.613 55.8898C212.224 55.9859 211.836 55.9859 211.545 55.9859C210.865 55.9859 210.38 55.7935 210.089 55.5059C209.798 55.1215 209.701 54.6414 209.701 54.0654L209.701 46.1906L213.584 46.1908V44.7505L209.701 44.7503V41.3895L209.603 41.2934L209.506 41.1973L208.05 41.6774L207.079 44.4625C206.691 44.5584 206.4 44.7505 206.012 44.8465C205.72 44.9426 205.332 45.1346 205.041 45.2306V46.1909L206.885 46.1911V54.0658C206.885 54.7381 206.982 55.3142 207.079 55.7944C207.177 56.2746 207.371 56.6586 207.662 57.0427C207.953 57.3307 208.245 57.6189 208.73 57.715C209.215 57.9069 209.798 57.9069 210.478 57.9069C211.836 57.9069 213.196 57.6191 214.652 56.9466C214.555 56.6588 214.555 56.4665 214.458 56.1785C214.07 56.0818 213.972 55.7937 213.972 55.6015ZM228.923 45.2307C228.923 45.0383 228.826 44.8463 228.826 44.6544L223.972 44.8463C223.972 45.0387 223.972 45.2307 223.972 45.4227C223.972 45.6147 223.972 45.8067 223.972 45.999L225.622 46.575C225.137 48.0154 224.651 49.4562 224.069 50.8963L222.515 55.2178L222.419 55.2177C222.03 53.9695 221.545 52.7208 221.156 51.4729C220.671 50.2243 220.283 48.9761 219.894 47.7273C219.7 47.1511 219.506 46.5751 219.409 46.095C219.312 45.5187 219.215 45.1347 219.215 44.6545L214.749 44.8467V45.9992L216.108 46.4792L218.341 52.1448C219.021 54.0657 219.797 55.8901 220.574 57.8105L221.545 57.9066L220.865 59.6351C220.768 59.8273 220.671 60.0193 220.574 60.3073C220.477 60.4994 220.283 60.7874 220.186 60.9796C219.991 61.1718 219.797 61.3638 219.603 61.5558C219.409 61.7481 219.118 61.8441 218.826 61.8441L216.496 60.4994C216.108 60.6916 215.914 60.8835 215.623 61.1716C215.429 61.4597 215.332 61.8441 215.332 62.132C215.332 62.612 215.526 63.0923 216.011 63.3803C216.497 63.6684 217.079 63.8603 217.759 63.8603C218.827 63.8603 219.7 63.4761 220.38 62.804C221.059 62.1317 221.642 61.1714 222.127 60.0192L224.263 54.9297C224.943 53.201 225.719 51.5687 226.399 49.8401C226.787 48.9758 227.079 48.2077 227.467 47.5352C227.855 46.8632 228.34 46.2868 228.826 45.9028C229.02 45.6146 228.923 45.4224 228.923 45.2307ZM139.121 27.945L139.218 18.4379L141.645 17.8617L141.548 16.2294C141.548 16.2294 140.48 16.3255 139.121 16.3255C137.762 16.3255 134.461 16.2294 134.461 16.2294L134.364 17.6698L136.597 18.3421V26.6967C136.597 27.3688 136.5 28.0411 136.402 28.6172C136.305 29.1936 136.111 29.7696 135.82 30.1537C135.529 30.6338 135.14 30.922 134.558 31.21C134.072 31.4982 133.393 31.5942 132.616 31.5942C131.743 31.5942 131.063 31.4983 130.577 31.21C130.092 31.018 129.607 30.634 129.412 30.2499C129.121 29.8657 128.927 29.3857 128.83 28.8093C128.733 28.2332 128.733 27.657 128.733 27.0807L128.733 18.342L131.063 17.7657L130.966 16.2294C130.966 16.2294 130.383 16.3255 128.247 16.3255C126.112 16.3255 122.714 16.2294 122.714 16.2294L122.617 17.6698L124.85 18.3423V28.1374C124.85 29.3858 125.044 30.3462 125.529 31.1145C126.015 31.8827 126.597 32.4591 127.277 32.9392C127.956 33.4192 128.733 33.7073 129.509 33.8995C130.286 34.0915 131.063 34.1873 131.84 34.1873C132.713 34.1873 133.49 34.0912 134.364 33.8995C135.237 33.7071 136.014 33.4194 136.791 32.9392C137.47 32.4591 138.053 31.7866 138.538 31.0186C138.927 30.3457 139.121 29.2896 139.121 27.945ZM134.266 48.0153C134.266 46.7671 133.975 45.8068 133.393 45.2303C132.81 44.654 131.839 44.3663 130.675 44.3663C130.286 44.3663 129.801 44.3663 129.315 44.4624C128.83 44.5583 128.345 44.5583 127.956 44.6545L126.014 46.479L125.432 44.5584L125.238 44.4625C124.655 44.5584 123.976 44.6548 123.393 44.7505C122.811 44.8465 122.131 44.9428 121.548 45.0387V46.191L123.393 46.6711V55.89L121.354 56.5625L121.452 57.7147L128.053 57.7144V56.5619L126.208 55.986C126.208 54.3534 126.208 52.8169 126.208 51.5687V47.9193C126.791 47.5351 127.374 47.3432 127.956 47.1512C128.538 46.9588 129.024 46.8632 129.509 46.8632C130.286 46.8632 130.868 47.0552 131.159 47.4393C131.451 47.8233 131.645 48.4956 131.645 49.264V55.8902L129.8 56.5623V57.7148L136.305 57.7147L136.402 56.5622L134.558 55.9862L134.266 48.0153ZM53.0076 14.8847C52.6194 14.5969 52.8136 13.9244 53.2988 13.9244C56.3084 14.2127 59.2209 14.6928 62.1336 15.3648V11.9078C62.1336 9.69905 60.386 7.97058 58.2503 7.97058H55.2405H55.1437H55.0465C54.4637 7.97058 53.9785 7.49058 53.9785 6.91437V1.05662C53.9785 0.480109 54.4639 0 55.0465 0H75.9193C76.502 0 76.9873 0.480109 76.9873 1.05643L76.9872 7.01017C76.9872 7.58634 76.5019 8.06645 75.9192 8.06645L72.9096 8.06686C70.7737 8.06686 69.0263 9.89132 69.0263 12.0037V13.6363C69.0263 13.7322 69.0263 13.7322 69.0263 13.7322V17.4773C71.7446 18.4377 74.3657 19.59 76.793 20.9346C78.3463 21.7986 79.8997 22.855 81.3561 23.9115C81.3561 23.9115 81.4533 23.9115 81.4533 24.0073C81.5502 24.2954 81.4533 24.5835 81.2589 24.6795C76.599 27.2724 70.58 29.289 63.7839 30.5374C63.4924 30.5374 63.2986 30.3454 63.2014 30.1535C61.4539 23.2396 57.7648 17.7657 53.0076 14.8847ZM46.3088 31.5942C51.7455 31.4981 57.0852 31.1141 61.9391 30.2497C59.6094 20.7428 53.2986 13.9245 45.8232 13.5403V31.2101C45.9203 31.4022 46.1146 31.5942 46.3088 31.5942ZM81.1617 52.8168C81.2589 52.8168 81.2589 52.8168 81.3562 52.8168C81.4534 52.9129 81.4534 53.2011 81.2591 53.2969C79.9 54.2572 78.4437 55.2175 76.9875 55.9857C74.1721 57.5222 71.0654 58.7708 67.7647 59.8268C67.7647 59.9229 67.7647 59.9229 67.7647 59.9229C64.464 68.9498 55.7261 74.9998 45.921 74.9998L45.3381 75C34.5617 75 25.4362 68.4699 21.6498 59.3469C21.5529 59.3469 21.3588 59.3469 21.2616 59.3469C18.4462 58.3866 15.8251 57.2342 13.4949 55.9859C12.1354 55.2177 10.7764 54.3533 9.5143 53.4893C9.41715 53.4893 9.32 53.3932 9.32 53.2972C9.22308 53.0089 9.32 52.6248 9.61122 52.5289C12.5236 50.9924 16.0187 49.744 19.8052 48.6878V47.4394C15.3393 48.5918 11.3588 50.1283 8.05795 51.9529C7.8638 52.0489 7.57261 52.0489 7.37854 51.8568C2.52422 47.8232 0 43.1178 0 38.22C0 33.3224 2.52422 28.6172 7.18427 24.6798C10.582 26.6964 14.8535 28.329 19.708 29.6733V28.425C15.7276 27.2726 12.0383 25.9282 9.02881 24.2958C8.64059 24.1035 8.54355 23.6235 8.93189 23.3354C10.291 22.3751 11.8443 21.4148 13.4946 20.5507C15.5333 19.4943 17.6691 18.5339 19.8054 17.7657V13.4444V11.9079C19.8054 9.79533 17.9607 8.06698 15.8249 8.06698L12.7181 8.06686C12.1355 8.06686 11.6501 7.58668 11.6501 7.01024V1.24859C11.6501 0.672305 12.1355 0.192196 12.7181 0.192196L44.4643 0.191968C45.0466 0.191968 45.5322 0.672077 45.5322 1.24836V7.01005C45.5322 7.58634 45.0466 8.06645 44.4643 8.06645L41.3578 8.06667C39.1248 8.06667 37.3774 9.79511 37.3774 11.9076V13.9243C37.6685 13.9243 37.9597 13.8282 38.2511 13.8282C38.5423 13.7322 38.7364 14.2122 38.4452 14.3082C38.0569 14.5003 37.7657 14.6922 37.3773 14.8845V16.4208C39.5129 14.9802 42.037 14.0201 44.5612 13.9239V31.2093C44.5612 31.4976 44.3671 31.6893 44.0758 31.6893C41.8433 31.6893 39.6104 31.5937 37.3773 31.4015V32.6498C39.5129 32.8417 41.7459 32.9377 43.979 32.9377C44.2702 32.9377 44.5616 33.2257 44.5616 33.514V43.7894C44.5616 44.0774 44.2703 44.3654 43.979 44.3654C41.746 44.3654 39.5134 44.4614 37.3773 44.6536V45.9019C39.5129 45.7099 41.7459 45.6138 43.979 45.6138C44.2702 45.6138 44.5616 45.9019 44.5616 46.1902V62.1314C44.5616 62.2275 44.5616 62.2275 44.5616 62.2275C44.5616 62.5156 44.2703 62.7074 43.979 62.7074C42.3288 62.6118 40.6781 62.1314 39.2218 61.3631C41.3578 64.7241 45.2413 66.8366 49.3184 66.8366L50.0948 66.8368C54.0752 66.8368 57.6676 64.9164 59.9006 61.8435C57.4735 62.2275 55.0465 62.6114 52.6192 62.8036C52.2307 62.8036 52.0369 62.3236 52.4251 62.1314C57.279 59.4428 61.2594 54.1612 63.1041 47.4391C63.1041 47.2472 63.2979 47.1511 63.4924 47.1511C70.3856 48.3994 76.4047 50.3199 81.1617 52.8168ZM46.5033 44.1742C51.7457 44.2703 56.988 44.6543 61.7454 45.3263C62.0364 45.4224 62.3277 45.2307 62.4248 44.9423C62.9101 42.8298 63.1044 40.6211 63.1044 38.3162C63.1044 36.2036 62.9101 34.187 62.5219 32.2666C62.4248 31.9787 62.1337 31.7865 61.842 31.7865C56.9882 32.5546 51.7458 32.939 46.406 33.0347C46.1146 33.0347 45.8233 33.323 45.8233 33.6111V43.5984C45.9203 43.8859 46.2118 44.1742 46.5033 44.1742ZM35.2414 11.9078V55.1214C35.2414 62.7081 41.5518 68.9499 49.4157 68.9499L50.192 68.9501C55.5317 68.9501 60.3861 66.0692 62.813 61.3638C62.813 61.2677 62.813 61.2677 62.9101 61.1714C63.1043 61.1714 63.2984 61.0756 63.4927 61.0756C60.4831 67.1253 54.3667 70.9664 47.3767 70.9664H46.9883C37.086 70.9664 29.1249 63.0921 29.1249 53.489V13.4443C29.1249 13.3484 29.1249 13.3484 29.1249 13.2522C29.2221 9.60306 32.3286 6.62604 36.1148 6.62604L38.6391 6.62623C36.5033 7.58668 35.2414 9.60337 35.2414 11.9078ZM43.3963 2.3051C43.3963 2.3051 13.7856 2.3051 13.8831 2.3051V5.76181L21.1642 5.76158C24.465 5.76158 27.3774 7.87448 28.5426 10.9474C29.6105 7.77849 32.6201 5.76158 35.9207 5.76158H43.3963V2.3051ZM45.8232 72.8873H45.2411C32.4259 72.8873 21.9409 62.7081 21.9409 50.1281L21.9407 13.9245V11.9081C21.9407 9.60325 20.5816 7.58668 18.6401 6.62623H21.0672C24.8531 6.62623 27.96 9.60325 28.0569 13.2522C28.0569 13.3483 28.0569 13.3483 28.0569 13.4445V16.5174V16.6135V53.489C28.0569 63.5725 36.503 71.8309 46.794 71.8309H47.1827C54.7549 71.8309 61.4539 67.5097 64.3664 60.7871C64.5604 60.691 64.7546 60.691 65.0458 60.5949C61.7452 67.9898 54.1726 72.8873 45.8232 72.8873ZM66.7934 12.0039C66.7934 9.89132 67.8614 7.97058 69.5119 6.91418C67.6671 7.58645 66.3081 9.31511 66.114 11.3314V16.517C66.3082 16.517 66.5994 16.6131 66.7934 16.7091V14.1164C66.7934 14.0203 66.7934 14.0203 66.7934 14.0203V12.0039ZM74.8514 2.11301L56.1146 2.1126V5.66571H60.0949C62.6187 5.66571 64.7548 7.29808 65.6284 9.50685C66.5021 7.20198 68.638 5.66571 71.1622 5.66571H74.8514V2.11301ZM64.2692 14.0207V16.0373C64.6577 16.1332 64.9489 16.2293 65.2401 16.3254V11.908C65.2401 11.8119 65.2401 11.8119 65.2401 11.7158C65.1429 9.31534 63.4927 7.39437 61.3564 6.8185C63.201 7.87482 64.2689 9.89132 64.2689 12.004L64.2692 14.0207ZM170.479 46.3827C170.091 45.8065 169.508 45.3263 168.828 44.9423C168.149 44.5583 167.178 44.3661 166.013 44.3661C164.751 44.3661 163.78 44.5583 162.906 44.9423C162.13 45.3263 161.45 45.9026 160.965 46.5747C160.479 47.2472 160.188 48.0151 159.994 48.7834C159.8 49.6478 159.703 50.416 159.703 51.2804C159.703 52.3368 159.8 53.297 160.091 54.0653C160.285 54.9294 160.674 55.6016 161.159 56.1779C161.644 56.7541 162.324 57.2342 163.1 57.5224C163.877 57.8103 164.848 58.0025 165.916 58.0025C166.887 58.0025 167.761 57.9064 168.634 57.6183C169.508 57.3302 170.285 56.9459 170.964 56.466L170.479 55.0256C169.799 55.3136 169.12 55.5057 168.44 55.602C167.761 55.6976 167.275 55.794 166.887 55.794C166.11 55.794 165.431 55.6979 164.945 55.5061C164.46 55.3137 163.974 55.0261 163.683 54.5458C163.392 54.1617 163.1 53.6813 163.003 53.0093C162.907 52.433 162.809 51.6647 162.809 50.8967L171.353 50.4166L171.547 50.1285C171.547 49.4563 171.45 48.7842 171.353 48.1122C171.158 47.6312 170.867 46.9591 170.479 46.3827ZM162.809 49.84C162.809 49.4557 162.809 49.0717 162.906 48.6877C163.003 48.3035 163.101 47.9193 163.392 47.5351C163.586 47.1511 163.877 46.863 164.265 46.6711C164.654 46.4788 165.139 46.2868 165.721 46.2868C166.207 46.2868 166.692 46.3827 166.984 46.5749C167.275 46.7671 167.566 46.9591 167.76 47.2472C167.955 47.5352 168.052 47.8233 168.149 48.2075C168.246 48.5915 168.246 48.9758 168.246 49.2639L162.809 49.84ZM147.276 33.8029H148.441C148.635 33.8029 148.829 33.8029 149.218 33.8029H150.48H151.742C152.13 33.8029 152.324 33.8029 152.421 33.8029C153.586 33.8029 154.557 33.6105 155.431 33.3229C156.305 33.0346 156.985 32.6506 157.664 32.1705C158.247 31.6904 158.732 31.1141 159.12 30.5379C159.508 29.8657 159.8 29.2896 159.994 28.6173C160.188 27.9452 160.382 27.2727 160.479 26.6969C160.576 26.0244 160.576 25.4485 160.576 24.9682C160.576 23.9119 160.479 22.8558 160.188 21.7993C159.896 20.7429 159.411 19.7827 158.732 19.0143C158.052 18.1501 157.178 17.4778 156.013 16.9978C154.945 16.5177 153.489 16.2295 151.839 16.2295C151.547 16.2295 151.256 16.2295 150.965 16.2295C150.674 16.2295 150.382 16.2295 150.091 16.2295C149.8 16.2295 149.412 16.2295 149.023 16.2295C148.635 16.2295 148.247 16.2295 147.761 16.2295L146.887 16.2293C146.596 16.2293 146.305 16.2293 146.111 16.2293C145.819 16.2293 145.528 16.2293 145.237 16.2293C144.849 16.2293 144.46 16.2293 144.072 16.2293L143.878 17.7658L145.916 18.3422L145.917 31.7864L143.684 32.4584L143.878 33.8988C144.363 33.8988 144.751 33.8988 145.14 33.8988H146.208C146.596 33.8029 146.985 33.8029 147.276 33.8029ZM149.8 18.7259C149.994 18.7259 150.188 18.7259 150.383 18.7259C150.577 18.7259 150.868 18.7259 151.062 18.7259C151.742 18.7259 152.518 18.822 153.198 19.0141C153.877 19.2061 154.46 19.4942 154.945 19.9742C155.431 20.4544 155.819 21.0305 156.11 21.8948C156.402 22.663 156.596 23.7194 156.596 24.9678C156.596 25.8319 156.499 26.6962 156.305 27.4647C156.11 28.2329 155.819 29.001 155.528 29.5771C155.139 30.1535 154.654 30.7294 153.974 31.0175C153.392 31.4017 152.615 31.5937 151.645 31.5937C151.353 31.5937 150.965 31.5937 150.674 31.5937C150.382 31.5937 149.994 31.4978 149.703 31.4978L149.8 18.7259ZM161.935 32.4583L162.033 33.9948L169.411 33.9949L169.508 32.3626L166.984 31.7864L166.79 20.8388L166.887 20.839L170.576 25.7361L177.177 34.3791L179.119 33.995C179.119 33.7068 179.119 33.1308 179.119 32.3627C179.119 31.5942 179.119 30.634 179.216 29.5778C179.216 28.5214 179.216 27.4651 179.313 26.2167C179.313 25.0643 179.313 23.9121 179.41 22.8558C179.41 21.7994 179.41 20.9352 179.507 20.071C179.507 19.3026 179.507 18.7262 179.507 18.4386L182.128 17.8623L182.031 16.2299L174.75 16.2293L174.653 17.6697L177.08 18.3422L177.275 27.7532L177.177 27.7529L174.071 23.6237L169.702 17.8621C169.508 17.6697 169.411 17.382 169.217 17.1896C169.022 16.9018 168.828 16.6136 168.731 16.2293C168.246 16.2293 167.469 16.2293 166.401 16.3254C165.139 16.3254 163.877 16.3254 162.518 16.3254L162.324 17.7657L164.945 18.534L164.654 31.6901L161.935 32.4583ZM104.656 32.3626L104.753 33.9949C104.753 33.9949 107.471 33.8988 108.928 33.8988C110.384 33.8988 113.2 33.9949 113.2 33.9949L113.296 32.3626L110.772 31.7862V26.6006C111.063 26.6967 111.937 26.8886 113.102 26.8886L118.345 34.8592L121.548 34.1871L121.839 33.1307L116.402 26.3126C118.344 25.5444 120.286 24.0078 119.703 20.3588C119.024 15.9416 114.267 16.3255 113.005 16.3255C111.645 16.3255 108.247 16.9018 105.335 16.2294L104.946 17.862C104.946 17.862 105.723 18.246 106.985 18.534L106.985 31.7865L104.656 32.3626ZM115.723 21.5107C115.723 23.2394 114.753 24.9679 110.772 24.2957V18.8222C110.869 18.8222 111.064 18.8222 111.161 18.8222C114.85 18.4379 115.723 19.8784 115.723 21.5107Z"
                        fill="#2C79E8"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1482_248">
                        <rect width="228.947" height="75" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                {/* <Image
                alt="blur"
                src="/blur.png"
                width={400}
                height={200}
                className="absolute -left-10 -top-4 sm:-top-1/2 -translate-y-1/4 z-10 opacity-60"
              /> */}
              </div>

              {pathname.split("/").splice(-1)[0] !== "book-add" && (
                <Button
                  onClick={() => router.push("/book-add")}
                  variant="primary"
                  className="!w-fit flex-shrink-0"
                >
                  Добавить книгу
                </Button>
              )}
            </div>
          </header>
        )}

        <main className="pb-40 container mx-auto px-5 box-content mt-20">
          <motion.div
            key={pathname}
            initial="hidden"
            animate="enter"
            variants={variants}
            transition={{
              ease: "easeOut",
              duration: 0.2,
            }}
            className={``}
          >
            {children}
          </motion.div>
        </main>

        {/* <div className="fixed bottom-0 bg-[#333] p-6 gap-2 rounded-t-[30px] mx-auto left-0 right-0 z-50">
          <span className="text-xl font-normal text-white">
            Временная навигация по страницам
          </span>
          <div className="flex gap-5">
            <Link href="/signin" className="text-success text-lg font-medium">
              Авторизация
            </Link>
            <Link href="/catalog" className="text-success text-lg font-medium">
              Каталог
            </Link>
            <Link href="/catalog/3" className="text-success text-lg font-medium">
              Страница книги
            </Link>
            <Link href="/book-add" className="text-success text-lg font-medium">
              Создание книги
            </Link>
          </div>
        </div> */}
      </div>

      {/* Фон */}
      <div className="fixed w-full h-full left-0 top-0 -z-10 bg-gray">
        {pathname.split("/").splice(-1)[0] === "signin" && (
          <Image
            alt="background"
            src={imagePath("/bg.png")}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
    </>
  );
};

export default Layout;
