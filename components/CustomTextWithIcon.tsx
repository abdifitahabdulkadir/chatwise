export default function CustomTextWithIcon({
  children,
  textOfIcon,
  onClickHandler,
}: {
  children: React.ReactNode;
  textOfIcon: string;
  onClickHandler: () => void;
}) {
  return (
    <div
      onClick={onClickHandler}
      className="flex cursor-pointer w-[4rem] h-[4rem] hover:bg-base-300 p-2 rounded-md hover:text-base transition-all duration-150 flex-col items-center justify-center"
    >
      {children}
      <span className="md:block hidden">{textOfIcon}</span>
    </div>
  );
}
