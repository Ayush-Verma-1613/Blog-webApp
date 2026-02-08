'use client';
import { Card } from 'antd';

const Slug = ({ title, description, image }) => {
  return (
    <div className="min-h-[60vh] flex justify-center pt-6 md:pt-12 bg-gray-50 px-4">
      <Card
        className="w-full max-w-7xl shadow-xl rounded-xl md:rounded-2xl border border-slate-900"
        styles={{ body: { padding: "1.5rem" } }}
        classNames={{ body: "md:!p-10" }}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-6">
          <div className="flex-1 order-2 md:order-1">
            <h1 className="text-2xl md:text-4xl font-bold capitalize text-gray-800">
              {title ? title.split("-").join(" ") : "Untitled"}
            </h1>

            <div className="mt-3 md:mt-4 h-1 w-12 md:w-16 bg-indigo-600 rounded-full"></div>
          </div>

          {image && (
            <div className="w-full md:w-80 lg:w-96 h-64 md:h-72 overflow-hidden rounded-lg border border-slate-300 order-1 md:order-2 flex items-center justify-center bg-gray-100">
              <img
                alt={title || "Blog image"}
                src={image}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        <p className="mt-4 md:mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
          {description || "No description available"}
        </p>
      </Card>
    </div>
  );
};

export default Slug;