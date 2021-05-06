import React, { useState } from "react";

function useForceUpdate() {
  const [, forceUpdate] = useState<boolean>();

  return React.useCallback(() => {
    forceUpdate((s) => !s);
  }, []);
}

export default useForceUpdate;
