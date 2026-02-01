import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react'; 
import ParamEditor from '../src/components/ParamEditor';
import { Param } from '../src/components/ParamEditor';

const params: Param[] = [
  { id: 1, name: 'Название', type: 'string' as const},
  { id: 2, name: 'Цена', type: 'string' as const},
];
  const props = {
    params, 
    model: {
      paramValues: [],
    },
  };

test('Отображает все параметры в форме', () => {

  render(<ParamEditor {...props} />);

  expect(screen.getByLabelText(/название/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/цена/i)).toBeInTheDocument();
});

test('Обновляет состояние при изменении поля ввода', () => {

  const { container } = render(<ParamEditor {...props} />);

  const inputField = container.querySelector(`input[data-param-id='1']`);

  fireEvent.change(inputField!, { target: { value: 'Новый продукт' } });

  expect(inputField!).toHaveValue('Новый продукт');
});

  test('Метод getModel возвращает корректную структуру', () => {

  const paramEditor = new ParamEditor(props);

  paramEditor.setState({
    values: {
      1: 'Значение 1',
      2: 'Значение 2',
    },
  });

  const modelResult = paramEditor.getModel();

  expect(modelResult.paramValues.length).toBe(2);
  expect(modelResult.paramValues).toEqual([
    { paramId: 1, value: 'Значение 1' },
    { paramId: 2, value: 'Значение 2' },
  ]);
});