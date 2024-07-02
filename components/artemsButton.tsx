export default function ArtemsButton() {
  return (
    <button
      className="next-step-button z-[10] w-[130px] h-[50px] bg-[#0066cc] text-white relative overflow-hidden group"
      style={{
        transform: "skew(0deg, -6deg)",
        borderRadius: "14px 4px 14px 4px",
        fontSize: "20px",
      }}
    >
      <div
        className={`w-[70%] z-[20] absolute top-[-50%] h-[200px] right-[-25%] transition-transform duration-1000 ease-in-out`}
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, #98f5fc 0%, rgba(152,245,252,0.48) 3%, rgba(72,171,224,0) 8%, rgba(72,171,224,0) 50%, rgba(72,171,224,0) 92%, rgba(152,245,252,0.48) 97%, #98f5fc 100%);",
        }}
      ></div>

      <div className="z-[30] relative">next step</div>
    </button>
  )
}
