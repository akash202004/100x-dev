type eventType = "click" | "scroll" | "mousemove";

type excludeType = Exclude<eventType, "click">; // 'scroll' | 'mousemove'

const handleEvent = (eventType: excludeType) => {
  console.log(eventType);
};

handleEvent("scroll"); // scroll
// handleEvent('click'); // Argument of type '"click"' is not assignable to parameter of type 'excludeType'.
