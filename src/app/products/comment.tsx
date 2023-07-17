import { HiStar } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";

const colors = ['text-teal-400', 'text-sky-400', 'text-indigo-400'];
const Comment = ({comments}:{comments: (string)[]}) => {
    return (
        <div className="flex flex-col gap-4 bg-sky-50 p-10 rounded-2xl bg-[url('/assets/images/overlay.png')] bg-contain bg-bottom bg-no-repeat">
          {
            comments.map((c, index:number)=>(
                <div key={index} className={`flex items-center gap-1 ${index % 2 === 0 ?  'justify-start' : 'justify-end'}`}>
                    {
                        index % 2 === 0 && <BsEmojiSmile className={`text-[36px]  ${colors[index]}`}/>
                    }
                    <div className="border border-slate-400/30 shadow-sm rounded-full p-6 text-base bg-white max-w-[500px] tracking-tight text-left">
                        <div className="flex text-yellow-500 mb-2 text-lg">
                            {Array.from({length: 5}, (x, i) => (
                                <HiStar key={i}/>
                            ))}
                        </div>
                        {c}
                    </div>
                    {
                        index % 2 !== 0 && <BsEmojiSmile className={`text-[36px]  ${colors[index]}`}/>
                    }
                </div>
            ))
          }
        </div>
    );
}

export default Comment;