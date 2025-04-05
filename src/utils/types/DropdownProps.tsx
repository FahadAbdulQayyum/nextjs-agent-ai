// Define Props Type for the Dropdown component
export interface DropdownProps {
  options: string[]; // Array of dropdown options
  placeholder?: string; // Placeholder text (optional)
  defaultValue?: string; // Default selected value (optional)
  onSelect: (selectedOption: string) => void; // Callback for option selection
}
