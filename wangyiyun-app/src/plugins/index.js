import { Swipe, SwipeItem, Button, Popup } from "vant";
let plugins = [Swipe, SwipeItem, Button, Popup];
export default function gantVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
