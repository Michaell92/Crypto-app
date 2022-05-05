function formatNumber(num, decimal = 2) {
  if (num === null || num === undefined) return '';
  if (typeof num === 'string') num = parseFloat(num);
  return parseFloat(num.toFixed(decimal)).toLocaleString();
}

function formatShortDate(date) {
  return new Date(date).toLocaleDateString();
}

function formatPercent(num, decimal = 2) {
  const per = parseFloat(num).toFixed(decimal);

  if (per > 0) {
    return `<i class="fas fa-caret-up" style="color: lime"}"></i>
       <span style="color: lime">${per}</span>`;
  } else if (per < 0) {
    return `<i class="fas fa-caret-down" style="color: red"}"></i>
      <span style="color: red">${String(per).replace('-', '')}</span>`;
  } else {
    return per;
  }
}

export { formatNumber, formatShortDate, formatPercent };
