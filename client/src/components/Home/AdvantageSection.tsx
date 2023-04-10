import { FC } from 'react';
import React from 'react';

export const AdvantageSection: FC = () => (
  <>
    <div className="bg-color-2 py-[120px]">
      <div className="container text-white">
        <h1 className="text-3xl-bold text-center mb-[9px]">Why learn with our courses?</h1>
        <p className="text-md-regular text-center mb-[51px]">
          Lorem ipsum dolor sit amet, consectetur
        </p>
        <div className="grid grid-cols-3 gap-[30px]">
          <div className="border border-solid border-white/[0.25] px-[60px] pt-[60px] pb-[51px] rounded-lg text-center group hover:bg-white cursor-pointer duration-300 flex flex-col items-center ">
            <div className="mb-[37px]">
              <svg
                className="fill-color-6 group-hover:fill-color-2 duration-300"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M78.4375 61.405H76.875V22.03C76.875 17.7222 73.3704 14.2175 69.0625 14.2175H64.375V10.2734C64.375 6.93481 61.6589 4.21875 58.3203 4.21875H38.5541C35.2155 4.21875 32.4994 6.93481 32.4994 10.2734V14.2175H10.9375C6.62964 14.2175 3.125 17.7222 3.125 22.03V61.405H1.5625C0.699463 61.405 0 62.1045 0 62.9675C0 70.0323 5.74768 75.78 12.8125 75.78H32.9688C33.8318 75.78 34.5312 75.0806 34.5312 74.2175C34.5312 73.3545 33.8318 72.655 32.9688 72.655H12.8125C8.00293 72.655 4.00024 69.1315 3.25073 64.53H76.7493C75.9998 69.1315 71.9971 72.655 67.1875 72.655H47.0312C46.1682 72.655 45.4688 73.3545 45.4688 74.2175C45.4688 75.0806 46.1682 75.78 47.0312 75.78H67.1875C74.2523 75.78 80 70.0323 80 62.9675C80 62.1045 79.3005 61.405 78.4375 61.405ZM35.6244 10.2734C35.6244 8.65784 36.9385 7.34375 38.5541 7.34375H58.3203C59.9359 7.34375 61.25 8.65784 61.25 10.2734V24.6863C61.25 26.3013 59.9359 27.616 58.3203 27.616H43.6456C43.2312 27.616 42.8339 27.7808 42.5409 28.0737L40.1166 30.4974V29.1785C40.1166 28.316 39.4171 27.616 38.5541 27.616C36.9385 27.616 35.6244 26.3019 35.6244 24.6863V10.2734ZM6.25 22.03C6.25 19.4452 8.35266 17.3425 10.9375 17.3425H32.4994V20.4675H10.9375C10.0745 20.4675 9.375 21.167 9.375 22.03V61.405H6.25V22.03ZM18.8373 61.405V60.4749C18.8373 55.8221 22.6227 52.0374 27.2748 52.0374H27.8998V55.0061C27.8998 55.8685 28.5992 56.5686 29.4623 56.5686C30.3253 56.5686 31.0248 55.8685 31.0248 55.0061V52.0374H31.6498C36.3025 52.0374 40.0873 55.8221 40.0873 60.4749V61.405H18.8373ZM33.5248 44.8499C33.5248 47.0898 31.7023 48.9124 29.4623 48.9124C27.2223 48.9124 25.3998 47.0898 25.3998 44.8499V43.8147C25.3998 41.5741 27.2223 39.7522 29.4623 39.7522C31.7023 39.7522 33.5248 41.5741 33.5248 43.8147V44.8499ZM43.2123 61.405V60.4749C43.2123 55.2679 39.7522 50.8557 35.0116 49.4122C36.0345 48.1702 36.6498 46.5802 36.6498 44.8499V43.8147C36.6498 39.8517 33.4253 36.6272 29.4623 36.6272C25.4993 36.6272 22.2748 39.8517 22.2748 43.8147V44.8499C22.2748 46.5802 22.89 48.1702 23.913 49.4122C19.1718 50.8557 15.7123 55.2679 15.7123 60.4749V61.405H12.5V23.5925H32.4994V24.6863C32.4994 27.4847 34.408 29.8462 36.9916 30.5365V34.2694C36.9916 34.9017 37.3724 35.4712 37.9565 35.7129C38.1494 35.7928 38.3527 35.8319 38.5541 35.8319C38.9606 35.8319 39.3604 35.6732 39.6588 35.3741L44.2926 30.741H58.3203C61.6589 30.741 64.375 28.0249 64.375 24.6863V23.5925H67.5V61.405H43.2123ZM70.625 61.405V22.03C70.625 21.167 69.9255 20.4675 69.0625 20.4675H64.375V17.3425H69.0625C71.6473 17.3425 73.75 19.4452 73.75 22.03V61.405H70.625Z" />
                <path d="M43.4894 67.0303H36.5887C35.7257 67.0303 35.0262 67.7297 35.0262 68.5928C35.0262 69.4558 35.7257 70.1553 36.5887 70.1553H43.4894C44.3524 70.1553 45.0519 69.4558 45.0519 68.5928C45.0519 67.7297 44.3524 67.0303 43.4894 67.0303Z" />
                <path d="M44.7797 23.47C45.249 23.741 45.7642 23.8765 46.2793 23.8765C46.7944 23.8765 47.3102 23.741 47.7795 23.47L53.6548 20.0782C54.5941 19.5356 55.155 18.5646 55.155 17.48C55.155 16.3954 54.5941 15.4243 53.6548 14.8817L47.7795 11.49C46.8402 10.948 45.719 10.948 44.7797 11.49C43.8403 12.0326 43.2794 13.0037 43.2794 14.0883V20.8717C43.2794 21.9563 43.8403 22.9274 44.7797 23.47ZM46.4044 14.3043L51.9043 17.48L46.4044 20.6556V14.3043Z" />
                <path d="M40 72.6558C39.5892 72.6558 39.1858 72.8212 38.8953 73.1117C38.6047 73.4041 38.4375 73.8057 38.4375 74.2183C38.4375 74.629 38.6047 75.0325 38.8953 75.323C39.1858 75.6135 39.5892 75.7789 40 75.7789C40.4108 75.7789 40.8142 75.6135 41.1047 75.323C41.3953 75.0306 41.5625 74.629 41.5625 74.2183C41.5625 73.8075 41.3953 73.4041 41.1047 73.1117C40.8142 72.8212 40.4108 72.6558 40 72.6558Z" />
              </svg>
            </div>
            <h1 className="text-2xl-bold group-hover:text-head mb-4 duration-300">01. Learn</h1>
            <p className="text-md-regular text-white/[0.7] max-w-[290px] group-hover:text-head duration-300">
              Lorem ipsum dolor sit amet, consectetur dolorili adipiscing elit. Felis donec massa
              aliqua.
            </p>
          </div>

          <div className="border border-solid border-white/[0.25] px-[60px] pt-[60px] pb-[51px] rounded-lg text-center group hover:bg-white cursor-pointer duration-300 flex flex-col items-center ">
            <div className="mb-[37px]">
              <svg
                className="fill-color-6 group-hover:fill-color-2 duration-300"
                width="80"
                height="76"
                viewBox="0 0 80 76"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M79.2588 24.6395L40.8213 0.889453C40.3178 0.578516 39.682 0.578516 39.1786 0.889453L26.273 8.86367C25.5389 9.31711 25.3114 10.2801 25.765 11.0143C26.2188 11.7485 27.1814 11.9755 27.9156 11.5221L40 4.05539L75.465 25.9687L40 47.882L20.8348 36.0401L37 26.4421C37.8136 27.1215 38.8597 27.5312 40 27.5312C42.5847 27.5312 44.6875 25.4284 44.6875 22.8437C44.6875 20.259 42.5847 18.1562 40 18.1562C37.4153 18.1562 35.3125 20.259 35.3125 22.8437C35.3125 23.156 35.3439 23.461 35.4023 23.7563L17.8353 34.1866L4.535 25.9687L16.8477 18.3609C17.5817 17.9074 17.8092 16.9446 17.3555 16.2102C16.902 15.4762 15.9392 15.249 15.205 15.7024L0.74125 24.6395C0.280469 24.924 0 25.4271 0 25.9687C0 26.5102 0.280469 27.0134 0.74125 27.2979L14.8036 35.9868L12.9911 37.063C10.1823 38.7307 8.4375 41.796 8.4375 45.0624V47.5304C6.66359 48.1718 5.39234 49.8724 5.39234 51.8649V54.5824C4.18656 55.773 3.4375 57.4254 3.4375 59.2499V73.7812C3.4375 74.644 4.13703 75.3437 5 75.3437H15C15.863 75.3437 16.5625 74.644 16.5625 73.7812V59.2499C16.5625 57.4254 15.8134 55.773 14.6077 54.5826V51.8651C14.6077 49.8727 13.3364 48.1721 11.5625 47.5305V45.0624C11.5625 42.8931 12.7212 40.8576 14.5866 39.7501L16.5625 38.5768V53.7274C16.5625 54.5902 17.262 55.2899 18.125 55.2899C25.9959 55.2899 33.3686 58.3852 38.8848 64.0056C39.1786 64.3049 39.5805 64.4735 40 64.4735C40.4195 64.4735 40.8212 64.3049 41.1152 64.0056C46.6316 58.3851 54.0042 55.2899 61.875 55.2899C62.738 55.2899 63.4375 54.5902 63.4375 53.7274V50.9687C63.4375 50.1059 62.738 49.4062 61.875 49.4062C61.012 49.4062 60.3125 50.1059 60.3125 50.9687V52.202C53.3944 52.5291 46.8875 55.0282 41.5625 59.3735V56.1141C41.5625 55.2513 40.863 54.5516 40 54.5516C39.137 54.5516 38.4375 55.2513 38.4375 56.1141V59.3735C33.1125 55.0282 26.6056 52.5291 19.6875 52.202V39.0046L39.1787 51.0479C39.4305 51.2034 39.7153 51.2812 40 51.2812C40.2847 51.2812 40.5697 51.2034 40.8213 51.0479L60.3125 39.0045V40.7604C60.3125 41.6232 61.012 42.3229 61.875 42.3229C62.738 42.3229 63.4375 41.6232 63.4375 40.7604V37.1185C63.4375 37.1038 63.4356 37.0896 63.4353 37.0749L79.2588 27.2977C79.7195 27.0132 80 26.5101 80 25.9685C80 25.427 79.7195 24.924 79.2588 24.6395ZM40 21.2812C40.8616 21.2812 41.5625 21.9821 41.5625 22.8437C41.5625 23.7052 40.8616 24.4062 40 24.4062C39.1384 24.4062 38.4375 23.7052 38.4375 22.8437C38.4375 21.9821 39.1384 21.2812 40 21.2812ZM8.51734 51.8649C8.51734 51.0474 9.1825 50.3823 10 50.3823C10.8175 50.3823 11.4827 51.0474 11.4827 51.8649V52.6874H8.51734V51.8649ZM13.4375 59.2499V72.2187H6.5625V59.2499C6.5625 57.3545 8.10453 55.8124 10 55.8124C11.8955 55.8124 13.4375 57.3545 13.4375 59.2499Z" />
              </svg>
            </div>
            <h1 className="text-2xl-bold group-hover:text-head mb-4 duration-300">02. Graduate</h1>
            <p className="text-md-regular text-white/[0.7] max-w-[290px] group-hover:text-head duration-300">
              Lorem ipsum dolor sit amet, consectetur dolorili adipiscing elit. Felis donec massa
              aliqua.
            </p>
          </div>

          <div className="border border-solid border-white/[0.25] px-[60px] pt-[60px] pb-[51px] rounded-lg text-center group hover:bg-white cursor-pointer duration-300 flex flex-col items-center ">
            <div className="mb-[37px]">
              <svg
                className="fill-color-6 group-hover:fill-color-2 duration-300"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M39.025 28.8315C39.436 28.8315 39.8391 28.6645 40.1297 28.3737C40.4219 28.0831 40.5875 27.68 40.5875 27.269C40.5875 26.8581 40.4219 26.455 40.1297 26.1645C39.8391 25.8739 39.4375 25.7065 39.025 25.7065C38.6141 25.7065 38.211 25.8737 37.9203 26.1645C37.6297 26.455 37.4625 26.8581 37.4625 27.269C37.4625 27.68 37.6297 28.0831 37.9203 28.3737C38.211 28.6644 38.6141 28.8315 39.025 28.8315Z" />
                <path d="M29.3375 28.8315C29.7485 28.8315 30.1516 28.6645 30.4422 28.3737C30.7344 28.0831 30.9 27.68 30.9 27.269C30.9 26.8581 30.7344 26.455 30.4422 26.1645C30.1516 25.8739 29.75 25.7065 29.3375 25.7065C28.9266 25.7065 28.5235 25.8737 28.2328 26.1645C27.9422 26.455 27.775 26.8581 27.775 27.269C27.775 27.68 27.9422 28.0831 28.2328 28.3737C28.5235 28.6644 28.9266 28.8315 29.3375 28.8315Z" />
                <path d="M71.588 32.2177C70.725 32.2177 70.0255 32.9172 70.0255 33.7802C70.0255 34.643 70.725 35.3427 71.588 35.3427C74.5033 35.3427 76.875 37.7144 76.875 40.6297V64.088C76.875 67.0033 74.5033 69.375 71.588 69.375H34.9005C31.9852 69.375 29.6134 67.0033 29.6134 64.088V40.6297C29.6134 37.7144 31.9852 35.3427 34.9005 35.3427H57.5022C58.3652 35.3427 59.0647 34.643 59.0647 33.7802C59.0647 32.9172 58.3652 32.2177 57.5022 32.2177H47.752C47.9977 31.17 48.1248 30.0948 48.1248 29.0008V22.5053H50.1041C50.967 22.5053 51.6666 21.8056 51.6666 20.9428V15.5461C51.6667 6.97406 44.6927 0 36.1205 0C31.6981 0 27.8653 2.56531 26.027 6.285C20.9847 6.69187 17.005 10.9223 17.005 16.0677V20.4688C17.005 21.1506 17.4473 21.7541 18.0978 21.9589C18.7247 22.1566 19.3609 22.2955 19.9998 22.382V29.0009C19.9998 33.8234 22.4622 38.2761 26.4883 40.8509V41.9075H24.6397C11.0534 41.9073 0 52.9608 0 66.5472V70.625C0 75.7944 4.20563 80 9.375 80H67.2917C68.1547 80 68.8542 79.3003 68.8542 78.4375C68.8542 77.5747 68.1547 76.875 67.2917 76.875H65.75C66.8317 75.6633 67.6022 74.1655 67.9369 72.5H71.588C76.2264 72.5 80 68.7264 80 64.088V40.6297C80 35.9914 76.2264 32.2177 71.588 32.2177ZM47.1505 72.5V76.875H38.0509V75.9786C38.0509 74.7028 37.6862 73.5109 37.057 72.5H47.1505ZM36.1205 3.125C42.9695 3.125 48.5416 8.69703 48.5416 15.5461V19.3803H36.1205C31.6389 19.3803 27.9928 15.7342 27.9928 11.2525C27.9928 6.77109 31.6389 3.125 36.1205 3.125ZM20.1302 16.0677C20.1302 13.0144 22.1863 10.4339 24.9859 9.63344C24.9094 10.1625 24.8678 10.7027 24.8678 11.2527C24.8678 13.5752 25.5753 15.7355 26.7858 17.5297C24.9206 19.0169 22.4877 19.6486 20.1302 19.2433V16.0677ZM23.1248 29.0008V22.3745C25.2194 22.0841 27.2197 21.2223 28.8786 19.8561C30.8373 21.5073 33.3641 22.5053 36.1205 22.5053H44.9998V29.0008C44.9998 30.1034 44.8377 31.1812 44.5189 32.2177H34.9005C31.3875 32.2177 28.3722 34.383 27.115 37.4484C24.6153 35.3919 23.1248 32.3084 23.1248 29.0008ZM9.375 76.875C5.92875 76.875 3.125 74.0713 3.125 70.625V66.5472C3.125 54.6838 12.7766 45.0323 24.6398 45.0323H26.4884V64.088C26.4884 65.0647 26.6575 66.0022 26.965 66.875H15.7812C14.9183 66.875 14.2188 67.5747 14.2188 68.4375C14.2188 69.3003 14.9183 70 15.7812 70H26.4884V76.875H9.375ZM29.6134 76.875V72.5H31.4473C33.3655 72.5 34.9259 74.0605 34.9259 75.9786V76.875H29.6134ZM50.2755 72.5H56.213V76.875H50.2755V72.5ZM59.338 76.8472V72.5H64.7152C63.978 74.8698 61.8808 76.6125 59.338 76.8472Z" />
                <path d="M53.2443 46.5386C50.0349 46.5386 47.4238 49.1497 47.4238 52.359C47.4238 55.5686 50.0349 58.1797 53.2443 58.1797C56.4537 58.1797 59.0648 55.5686 59.0648 52.359C59.0648 49.1497 56.4537 46.5386 53.2443 46.5386ZM53.2443 55.0547C51.7579 55.0547 50.5488 53.8454 50.5488 52.359C50.5488 50.8726 51.758 49.6636 53.2443 49.6636C54.7305 49.6636 55.9398 50.8726 55.9398 52.359C55.9398 53.8454 54.7305 55.0547 53.2443 55.0547Z" />
                <path d="M64.5328 35.342C64.9453 35.342 65.3485 35.1764 65.6391 34.8858C65.9297 34.5936 66.0969 34.1922 66.0969 33.7795C66.0969 33.3686 65.9297 32.9672 65.6391 32.675C65.3469 32.3844 64.9453 32.2188 64.5328 32.2188C64.1219 32.2188 63.7188 32.3844 63.4281 32.675C63.1375 32.9672 62.9703 33.3686 62.9703 33.7795C62.9703 34.1922 63.1375 34.5936 63.4281 34.8858C63.7188 35.1766 64.1219 35.342 64.5328 35.342Z" />
              </svg>
            </div>
            <h1 className="text-2xl-bold group-hover:text-head mb-4 duration-300">03. Work</h1>
            <p className="text-md-regular text-white/[0.7] max-w-[290px] group-hover:text-head duration-300">
              Lorem ipsum dolor sit amet, consectetur dolorili adipiscing elit. Felis donec massa
              aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);