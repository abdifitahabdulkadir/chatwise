export default function RenderInfo() {
  return (
    <div className="@container flex w-full items-center justify-center px-10 md:px-4">
      <blockquote className="border-dark-green mt-4 w-full rounded-2xl border-l-4 px-2 py-3 text-left text-wrap text-white/50 @lg:w-[60%]">
        Due to the nature of the voice-to-voice system, it might not always
        accurately capture your voice as spoken. Everything you say will appear
        in the text area below as text. If you are not satisfied with the
        result, please edit or rewrite it. Additionally, due to this limitation,
        the system may sometimes fail to capture your voice entirely. In such
        cases, feel free to write your message directly in the text box below
        and press the
        <strong className="ms-2">ENTER KEY.👇</strong>
      </blockquote>
    </div>
  );
}
