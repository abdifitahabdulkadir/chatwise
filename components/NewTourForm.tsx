export default function NewTourForm({
  handleOnSubmit,
  isLoading,
}: {
  handleOnSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  isLoading: boolean | undefined;
}) {
  return (
    <div className="flex flex-col items-start h-fit justify-center gap-y-3">
      <h2>Select Your dream destination</h2>
      <form className="join" onSubmit={handleOnSubmit}>
        <input
          name="city"
          type="text"
          disabled={isLoading}
          className="input focus:border-primary input-bordered focus:outline-none join-item focus:ring-0 outline-none "
          placeholder="City"
          required
        />
        <input
          type="text"
          name="country"
          className="input focus:border-primary input-bordered focus:outline-none join-item focus:ring-0 outline-none"
          placeholder="Country"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="btn hover:bg-base hover:text-primary join-item text-white rounded-r-full bg-primary"
        >
          Search
        </button>
      </form>
    </div>
  );
}
