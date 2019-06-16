import { STARTED, QUEUED } from "./desired-states";

class EnqueuedRefresh {
  constructor(remainingSlots) {
    this.remainingSlots = remainingSlots;
  }

  step() {
    if (this.remainingSlots > 0) {
      this.remainingSlots--;
      return STARTED;
    } else {
      return QUEUED;
    }
  }
}

class EnqueuedPolicy extends BoundedPolicy {
  prepareRefresh(_numRunning, _numQueued) {
    return new EnqueuedRefresh(this.maxConcurrency);
  }
}

export default EnqueuedPolicy;