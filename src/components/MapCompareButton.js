export const MapCompareButton = ({ compareMode, onCompareModeChange }) => {
  return (
    <button onClick={onCompareModeChange}>
      {compareMode ? 'cancel' : 'compare'}
    </button>
  )
}
