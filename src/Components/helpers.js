export const sortMin =(objs) =>{
    objs.sort((a, b) =>
        Math.max.apply(
          Math,
          a.bids.map(function (o) {
            return o.amount;
          })
        ) >
        Math.max.apply(
          Math,
          b.bids.map(function (o) {
            return o.amount;
          })
        )
          ? 1
          : Math.max.apply(
              Math,
              b.bids.map(function (o) {
                return o.amount;
              })
            ) >
            Math.max.apply(
              Math,
              a.bids.map(function (o) {
                return o.amount;
              })
            )
          ? -1
          : 0
      );
      return objs
}

export const sortMax = (objs) =>{
    objs.sort((a, b) =>
        Math.max.apply(
          Math,
          a.bids.map(function (o) {
            return o.amount;
          })
        ) <
        Math.max.apply(
          Math,
          b.bids.map(function (o) {
            return o.amount;
          })
        )
          ? 1
          : Math.max.apply(
              Math,
              b.bids.map(function (o) {
                return o.amount;
              })
            ) <
            Math.max.apply(
              Math,
              a.bids.map(function (o) {
                return o.amount;
              })
            )
          ? -1
          : 0
      );
      return objs
}