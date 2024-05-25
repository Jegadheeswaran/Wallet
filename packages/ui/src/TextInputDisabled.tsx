"use client";

export const TextInputDisabled = ({
  label,
  value,

}: {
  label: string;
  value: string;
  
}) => {
  return (
    <div className="pt-2">
      <label className="pt-4 block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        readOnly
      />
    </div>
  );
};
