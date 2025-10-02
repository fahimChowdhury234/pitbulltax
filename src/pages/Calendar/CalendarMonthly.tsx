import CalendarHeader from "../../components/calendar/CalendarHeader";
import { CAL_ITEMS } from "../../data/calendar";

export default function CalendarMonthly(){
  const days = Array.from({length:30}, (_,i)=>i+1); // mock April
  const dateOf = (d:number)=>`2025-04-${String(d).padStart(2,"0")}`;

  return (
    <div className="pb-24">
      <CalendarHeader subtitle={<div className="mt-1 text-blue-600 font-bold">April</div>} />
      <div className="px-3 mt-2 grid grid-cols-7 gap-2">
        {["M","T","W","T","F","S","S"].map((d,i)=><div key={i} className="text-center text-xs text-gray-500">{d}</div>)}
        {days.map(d=>{
          const items = CAL_ITEMS.filter(i=>i.date===dateOf(d));
          return (
            <div key={d} className="h-20 border rounded-md p-1 text-xs relative">
              <div className="absolute right-1 top-1 text-gray-400">{d}</div>
              <div className="flex flex-wrap gap-1 mt-4">
                {items.map(it=>(
                  <span key={it.id} className="text-white rounded-[6px] px-1 py-[2px] text-[10px]"
                        style={{backgroundColor: it.kind==="task"?"#16a34a": it.kind==="zoom"?"#60a5fa":"#ef4444"}}>
                    {it.kind==="zoom"?"🎥":it.kind==="event"?"📅":"🗂️"}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed right-4 bottom-24">
        <button className="w-14 h-14 rounded-full bg-blue-500 text-white grid place-items-center shadow-xl">+</button>
      </div>

      <Footer active="Monthly"/>
    </div>
  );
}
/* ------- Footer tabs (kept from your version, styled to match) ------- */

function Footer({active}:{active:string}){
  const mk=(l:string,u:string,on:boolean)=><a href={u} className={`px-4 py-2 rounded-md ${on?"bg-blue-100 text-blue-700":"text-[#0E3561]"}`}>{l}</a>;
  return (
    <div className="fixed left-0 right-0 bottom-[86px] mx-3 rounded-3xl bg-white border-t px-4 py-3 flex items-center gap-2 justify-between">
      <div className="flex gap-2">
        {mk("Today","/calendar/today", active==="Today")}
        {mk("Daily","/calendar/daily", active==="Daily")}
        {mk("Weekly","/calendar/weekly", active==="Weekly")}
        {mk("Monthly","/calendar/monthly", active==="Monthly")}
      </div>
      <div className="px-3 py-2 rounded-md bg-[#1F66D1] text-white">🗓️ Calendar</div>
    </div>
  );
}

