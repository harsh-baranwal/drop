export default function Card({children, visibility}) {
    return (
        <div className={`bg-white shadow-sm shadow-gray-300 rounded-md my-3 border-gray-300 border-[1px] px-4 py-4 ${visibility}`}>{children}</div>
    );
}