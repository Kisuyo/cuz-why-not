export default function Ticket(props: { children: any }) {
  return (
    <div className="bg-white relative px-3 p-[6px] text-black w-fit">
      <div
        className="absolute top-0 left-[-6px] bg-white h-[40%] w-[12px]"
        style={{ borderRadius: "4px 0px 0px 8px" }}
      ></div>
      <div className="absolute top-[50%] translate-y-[-50%] left-[-8px] h-[25%] border-r-[2px] w-[10px] rounded-full bg-transparent  border-white"></div>
      <div
        className="absolute bottom-0 left-[-6px] bg-white h-[40%] w-[12px]"
        style={{ borderRadius: "8px 0px 0px 4px" }}
      ></div>
      <div>{props.children}</div>
      <div
        className="absolute top-0 right-[-6px] bg-white h-[40%] w-[12px]"
        style={{ borderRadius: "0px 4px 8px 0px" }}
      ></div>
      <div className="absolute top-[50%] translate-y-[-50%] right-[-8px] h-[25%] border-l-[2px] w-[10px] rounded-full bg-transparent  border-white"></div>
      <div
        className="absolute bottom-0 right-[-6px] bg-white h-[40%] w-[12px]"
        style={{ borderRadius: "0px 8px 4px 0px" }}
      ></div>
    </div>
  );
}
