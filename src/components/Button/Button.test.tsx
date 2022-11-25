import { fireEvent, render } from "@testing-library/react";
import Button, { ButtonProps } from "./Button";

// Sut: System Under Test
const makeSut = (props: Partial<ButtonProps>) => {
  return render(<Button label="label" onClick={jest.fn()} {...props} />);
};

describe("<Button />", () => {
  test("Should render label correctly", () => {
    const { getByText } = makeSut({ label: "Click Here!" });

    expect(getByText(/Click Here!/)).toBeInTheDocument();
  });

  test("Should call onClick successfully", () => {
    const spy = jest.fn();
    const { getByText } = makeSut({ onClick: spy });

    fireEvent.click(getByText(/label/));

    expect(spy).toHaveBeenCalled();
  });
});
