import React from "react";
// TODO: Create a form for create and edit
const Form = () => {
  // TODO: Make the fields into components

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Add New Test
        </h2>

        <form
        // onSubmit={(e) => handleSave(e, dataState, title)}
        >
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* {formInputs.map((obj) => renderInputs(obj))} */}
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="block px-5 py-2 mt-5 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
