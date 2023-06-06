import Vue from "vue";
import Router from "vue-router";
import config from "@/config";
import Map from "@/views/Map.vue";
import TimelineView from "@/views/TimelineView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: config.router.basePath,
  routes: [
    {
      path: "/",
      name: "map",
      components: {
        map: Map,
        timeline: TimelineView,
      },
    },
  ],
});
