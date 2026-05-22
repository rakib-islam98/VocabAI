import AddWordForm from "../components/AddWordForm";

const AddWordPage = () => {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add New Word
        </h1>

        <p className="text-gray-500 mt-2">
          Save vocabulary from real-life
          reading, conversations, and
          content.
        </p>
      </div>

      <AddWordForm />
    </div>
  );
};

export default AddWordPage;