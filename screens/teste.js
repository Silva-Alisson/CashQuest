 
 const initialDate = new Date();
 const [date, setDate] = useState(initialDate);
 const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const adjustedDate = startOfDay(
        addMinutes(selectedDate, date.getTimezoneOffset())
      );
      setDate(adjustedDate);
      hideDatePicker();
    } else {
      hideDatePicker();
    }
  };

  const formattedDate = format(date, "dd/MM/yy");

  return (<Text
    style={{
      fontSize: 16,
      fontWeight: "normal",
      marginVertical: 8,
      color: COLORS.greyDark
    }}
  >
    Data
  </Text>

  <TouchableOpacity
    style={[styles.input, { borderColor: COLORS.greyDark }]}
    onPress={showDatePicker}
  >
    <Text
      placeholderTextColor={COLORS.grey}
      style={{
        width: "100%"
      }}
    >
      {formattedDate}
    </Text>
  </TouchableOpacity>
  {showPicker && (
    <DateTimePicker
      value={date}
      mode="date"
      display="spinner"
      is24Hour={true}
      minimumDate={new Date("1900-01-00")}
      maximumDate={new Date("2100-01-00")}
      onChange={handleDateChange}
    />
  )})