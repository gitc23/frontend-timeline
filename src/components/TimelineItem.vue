<template>
  <li
    class="timeline-item"
    :class="{ selected: selectedStayPointId === stayPoint.id }"
    @click="setSelectedStayPointId(stayPoint.id)"
  >
    <div class="timeline-time">
      <div class="timeline-start-time">
        {{ formatTime(stayPoint.startTimeReadable) }}
      </div>
      <div class="timeline-end-time">
        {{ formatTime(stayPoint.endTimeReadable) }}
      </div>
    </div>
    <div
      class="timeline-title"
      contenteditable="true"
      @input="handleTitleInput"
    >
      Stay point {{ stayPoint.id }}
    </div>
    <div class="timeline-duration">
      {{ formatDuration(stayPoint.duration) }}
    </div>
  </li>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    stayPoint: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["selectedStayPointId"]),
  },
  methods: {
    ...mapActions(["setSelectedStayPointId"]),
    handleTitleInput(event) {
      const newTitle = event.target.textContent;
      // Update the stayPoint title in the Vuex store or
      // emit an event to notify the parent component
    },
    formatTime(time) {
      const date = new Date(time);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    formatDuration(duration) {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      if (hours > 0) {
        return `${hours} hours, ${minutes} mins`;
      } else {
        return `${minutes} mins`;
      }
    },
  },
};
</script>

<style>
.timeline-view ul.timeline-content li {
  list-style: none;
  margin: auto;
  margin-left: 80px;
  min-height: 50px;
  /*background: rgba(255,255,0,0.1);*/
  border-left: 1px dashed #86d6ff;
  padding: 0 0 50px 30px;
  position: relative;
}
.timeline-view ul.timeline-content:last-child {
  border-left: 0;
}

.timeline-view ul.timeline-content li::before {
  position: absolute;
  left: -18px;
  top: -5px;
  content: " ";
  border: 8px solid rgba(255, 255, 255, 0.74);
  border-radius: 500%;
  background: #258cc7;
  height: 20px;
  width: 20px;
  transition: all 100ms ease-in;
}

.timeline-view ul.timeline-content li.selected::before {
  background: var(--color-selected);
}

.timeline-view ul.timeline-content li:hover::before {
  border-color: #258cc7;
  transition: all 1000ms ease-in-out;
}

ul.timeline-content li .timeline-duration {
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
}

ul.timeline-content li .timeline-title {
  position: relative;
  font-weight: bold;
}

ul.timeline-content li .timeline-title::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  /* Add arrow icon or other indicator */
  /* For example, using an SVG arrow icon */
  /* background-image: url("arrow.svg"); */
  background-size: contain;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

ul.timeline-content li .timeline-time {
  color: #8d8d8d;
  position: absolute;
  width: 0px;
  left: -50%;
  text-align: right;
  font-size: 12px;
}
</style>
