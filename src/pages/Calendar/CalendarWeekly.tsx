import CalendarHeader from "../../components/calendar/CalendarHeader";
import { CAL_ITEMS } from "../../data/calendar";

// Week grid, simple 7x(03..11)
export default function CalendarWeekly(){
  const hours = ["03","04","05","06","07","08","09","10","11"];
  const weekDates = ["2025-04-18","2025-04-19","2025-04-20","2025-04-21","2025-04-22","2025-04-23","2025-04-24"];

  return (
    <div className="pb-24">
      <CalendarHeader subtitle={<div className="mt-1 text-blue-600 font-bold">18 April 2025 – 24 April 2025</div>} />
      <div className="px-3 mt-2">
        <div className="grid grid-cols-8 gap-1 text-xs text-gray-500">
          <div></div>
          {["M","T","W","T","F","S","S"].map((d,i)=><div key={i} className="text-center">{d}</div>)}
        </div>
        {hours.map(h=>(
          <div key={h} className="grid grid-cols-8 gap-1 items-center">
            <div className="text-xs text-gray-500 py-3">{h}:00</div>
            {weekDates.map((d,idx)=>{
              const items = CAL_ITEMS.filter(i=>i.date===d && i.start.startsWith(h));
              return (
                <div key={idx} className="h-12 border rounded-md relative">
                  {items.map(it=>(
                    <div key={it.id}
                         className={`absolute inset-1 rounded-md text-white text-[10px] px-1 grid place-items-center`}
                         style={{backgroundColor: it.kind==="task"?"#16a34a": it.kind==="zoom"?"#60a5fa":"#ef4444"}}>
                      {it.kind==="task"?"🗂️":it.kind==="zoom"?"🎥":"📅"}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <Footer active="Weekly"/>
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

