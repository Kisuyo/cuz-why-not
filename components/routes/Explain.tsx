import { motion } from "framer-motion";
import BlurTransition from "../BlurTransition";
import Icons from "../Icons";

export default function Explain() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      ></link>
      <div
        className="w-screen h-full bg-black"
        style={{ fontFamily: "Roboto" }}
      >
        <Nav />
        <div className="w-full h-screen p-2 pb-0">
          <div
            className="bg-white z-[10] relative overflow-hidden rounded-lg w-full h-full p-[100px]"
            // style={{
            //   background: "url(creditcardworldv2.png)",
            //   backgroundSize: "cover",
            //   backgroundPosition: "end",
            //   backgroundRepeat: "no-repeat",
            // }}
          >
            <img
              src="./creditcardworldv3.png"
              alt=""
              className="absolute z-[20] top-[50%] translate-y-[-50%] right-0 h-[700px]"
            />
            <div className="w-[80%] z-[30] text-[50px] font-bold">
              {" "}
              <div
                className=""
                style={{
                  background:
                    "linear-gradient(120deg, rgba(59,130,246,1) 0%, rgba(127,178,255,1) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Solpay
              </div>
              <div className="text-[24px] gap-[20px] pt-[20px]  flex flex-col w-[60%]  font-semibold">
                <div>
                  Единственный провайдер для обслуживания клиентов сегмента
                  High-Risk.{" "}
                </div>
                <div>
                  {" "}
                  Положитесь на наши{" "}
                  <span className="text-blue-500">решения</span> и забудьте о
                  проблеме ввода и{" "}
                  <span className="text-blue-500"> вывода средств</span>.
                </div>
              </div>
              <div className="flex gap-4 text-[14px] pt-[60px] text-blue-500">
                <div className="px-6 p-2 border-blue-500 border-2 rounded-full">
                  БУКМЕКЕРЫ
                </div>
                <div className="px-6 p-2 border-2 border-blue-500 rounded-full">
                  АЗАРТНЫЕ ИГРЫ
                </div>
                <div className="px-6 p-2 border-2 border-blue-500 rounded-full">
                  ФОРЕКС И КРИПТОПЛАТФОРМЫ
                </div>
              </div>
              <button
                onClick={() => {
                  document.getElementById("connect")?.scrollIntoView();
                }}
                className="px-[30px] mt-[60px] border-2 border-blue-400/60 p-2 rounded-full text-[16px] bg-blue-500 text-white"
              >
                КОНТАКТЫ
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-screen p-2">
          <div
            id="conditions"
            className=" relative h-full w-full rounded-lg p-[60px] px-[100px] flex flex-col gap-[40px]"
            style={{
              background:
                "linear-gradient(120deg, rgba(226,251,255,1) 0%, rgba(253,235,255,1) 100%)",
            }}
          >
            {/* <div
              className="absolute bottom-[100px] flex items-center justify-evenly right-0 bg-white w-[500px] drop-shadow-xl h-[100px]"
              style={{ borderRadius: "10px 0 0 10px" }}
            >
              <img src="" alt="" />
            </div> */}
            {/* <div className="backgroundImage absolute top-0 left-0 w-full h-full"></div> */}
            <div className="flex flex-col gap-[20px]">
              <h1>ПРИЕМ ПЛАТЕЖЕЙ ДЛЯ ВАШЕГО БИЗНЕСА</h1>
              <motion.div className="flex flex-col gap-[24px]">
                <p>
                  Solbond обладает многолетним опытом по внедрению платежных
                  сервисов для разных отраслей бизнеса. Главный подход нашей
                  компании — индивидуальный подход к каждому клиенту и
                  выстраивание долгосрочных взаимовыгодных отношений.
                </p>
                <p>
                  Клиентам сервиса по приему онлайн платежей Solbond
                  предоставляется набор из наиболее востребованных платежных
                  методов оплаты в рамках одного договора и в рамках одной
                  технической интеграции.
                </p>
                <p>
                  Компания Solbond работает на собственном программном
                  обеспечении и не зависит от вендоров и поставщиков услуг.
                  Услуги эквайринга и расчетные услуги по договору-оферте
                  предоставляются кредитными организациями — партнерами нашего
                  сервиса, что позволяет нашей компании предоставлять своим
                  клиентам услуги по гибким конкурентным тарифам и
                  диверсифицировать риски операционной деятельности.
                </p>
                <p>
                  Удобный личный кабинет позволяет нашим клиентам получать
                  аналитические и агрегированные отчеты по проведенным
                  транзакциям, а собственная система фрод-мониторинга дает
                  возможность оперировать индивидуальными настройками с
                  сохранением высокого уровня конверсии.
                </p>
              </motion.div>
              <div className="flex-between gap-[40px] h-[200px] w-full">
                <div className=" flex flex-col gap-[20px] bg-white p-[20px] px-[24px] h-full min-w-[30%] rounded-lg drop-shadow-xl">
                  <div className="text-[20px] font-bold">ТАРИФЫ</div>
                  <div className="flex flex-col gap-2 ">
                    <div>Комиссия — от 6,5%</div>
                    <div>Абонплата — 0</div>
                    <div>Подключение — 0</div>
                  </div>
                </div>
                <div className="w-[70%] h-full">
                  <img
                    src="./cardtypessmaller.jpg"
                    className="h-full rounded-lg drop-shadow-xl"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-2 pt-0 h-full">
          <div
            id="connect"
            className=" w-full h-full bg-white rounded-lg px-[100px] p-[60px] flex"
          >
            <div className="w-[70%]">
              <h1>Техническое подключение</h1>
              <p className="pb-[20px]">
                Компания Solbond предлагает клиентам несколько вариантов для
                реализации технического взаимодействия:
              </p>
              <div>
                <div className="flex gap-2 items-center">
                  {" "}
                  <div>
                    <Icons name="ArrowRight"></Icons>
                  </div>
                  Интеграция по API
                </div>
                <div className="flex gap-2 items-center">
                  {" "}
                  <div>
                    <Icons name="ArrowRight"></Icons>
                  </div>
                  Подключение через CMS модуль
                </div>
                <div className="flex gap-2 items-center">
                  <div>
                    <Icons name="ArrowRight"></Icons>
                  </div>
                  Выставление ссылки на оплату клиенту
                </div>
              </div>
            </div>
            <div className=" flex-center">
              <img src="./cardtypes.jpg" alt="" className="w-[400px]" />
            </div>
          </div>
        </div>
        <div id="contacts" className="w-full h-[50vh] p-2 pt-0">
          <div
            style={{
              background:
                "linear-gradient(120deg, rgba(214,249,255,1) 0%, rgba(252,223,255,1) 50%, rgba(255,254,223,1) 100%)",
            }}
            className=" w-full h-full flex justify-between flex-col rounded-lg px-[100px] pb-[10px] py-[40px]"
          >
            <div className="flex flex-col gap-2">
              <h1>КОНТАКТЫ</h1>
              <p className="font-bold text-[18px]">Мы всегда на связи!</p>
              <p>
                Будем рады помочь и ответить на ваши вопросы — звоните, пишите!
              </p>
            </div>
            <div className="p-[60px] py-[18px] bg-white drop-shadow-xl text-black/80 w-full mt-[20px] rounded-lg flex justify-evenly items-center ">
              <button>Telegram</button>
              <button>Whatsapp</button>
              <button>Email</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Nav() {
  return (
    <div className="h-[100px] w-screen p-2 pb-0">
      <div className="bg-white w-full h-full rounded-lg p-4 px-6 flex-between">
        <div className="font-bold text-[28px]">Solpay</div>
        <div className="flex gap-[28px] font-bold">
          <div
            onClick={() => {
              document.getElementById("conditions")?.scrollIntoView();
            }}
          >
            УСЛОВИЯ
          </div>
          <div
            onClick={() => {
              document.getElementById("connect")?.scrollIntoView();
            }}
          >
            ПОДКЛЮЧЕНИЕ
          </div>
          <div
            onClick={() => {
              document.getElementById("contacts")?.scrollIntoView();
            }}
          >
            КОНТАКТЫ
          </div>
        </div>
        <img src="./cardtypessmaller.jpg" className="h-[60px]" alt="" />
      </div>
    </div>
  );
}
