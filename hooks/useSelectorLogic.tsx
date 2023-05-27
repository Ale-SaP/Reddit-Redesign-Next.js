type Selector = "Hot" | "New" | "Top"
type Timeframe = "hour" | "day" | "week" | "month" | "year" | "all"

const isValidSelector = (selector: string): selector is Selector =>
  selector === "Hot" || selector === "New" || selector === "Top";

const isValidTimeframe = (timeframe: string): timeframe is Timeframe =>
  timeframe === "hour" ||
  timeframe === "day" ||
  timeframe === "week" ||
  timeframe === "month" ||
  timeframe === "year" ||
  timeframe === "all";

const defaultSelector = "Hot";
const defaultTimeframe = "day";

export default function isValidCombination(selector: string, timeframe: string) {
  //This line just validates the selector and timeframe
  if (isValidSelector(selector) && isValidTimeframe(timeframe)) {

    //Checking the combinations
    if ((selector == "Top")) {
      return [selector, timeframe]
    }
    else {
      if (timeframe == "day" || timeframe == "hour") {
        return [selector, timeframe]
      }
      else {
        return [selector, defaultTimeframe]
      }
    }
  }
  else if (isValidSelector(selector)) {
    return [selector, defaultTimeframe]
  }

  else {
    return [defaultSelector, defaultTimeframe]
  }
}