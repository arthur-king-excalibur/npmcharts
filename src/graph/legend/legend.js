import Vue from 'vue';
import { removePackage } from '../../packages/packages.js';
import { isSameMonth, format as formatDate, addDays } from 'date-fns';

export default Vue.extend({
  props: {
    modules: Array,
    date: Date,
    periodLength: Number,
  },
  template: require('./legend.html'),
  methods: {
    removePackage(packageName) {
      ga('send', 'event', 'legend', 'remove', packageName);
      removePackage(packageName);
      this.$emit('legend-blur');
    },
    handleMouseEnterLegend() {
      this.$emit('legend-focus');
    },
    handleMouseLeaveLegend() {
      this.$emit('legend-blur');
    },
    handleMouseEnterPackage(packageName) {
      this.$emit('package-focus', packageName);
    },
    handleMouseLeavePackage(packageName) {
      this.$emit('package-blur', packageName);
    },
    formatWeekByStartingDate(startOfPeriod) {
      const startDate = formatDate(startOfPeriod, 'MMMM Do');
      const endOfPeriod = addDays(startOfPeriod, 6);
      if (isSameMonth(startOfPeriod, endOfPeriod)) {
        const endDate = formatDate(endOfPeriod, 'Do');
        return `${startDate} - ${endDate}`;
      }
      const endDate = formatDate(
        addDays(startOfPeriod, this.periodLength - 1),
        'MMMM Do',
      );
      return `${startDate} - ${endDate}`;
    },
  },
});
