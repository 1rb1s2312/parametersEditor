import * as React from 'react';

export interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  values: Record<number, string>;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      values: {},
    };

    props.model.paramValues.forEach((val) => {
      if (!Object.prototype.hasOwnProperty.call(this.state.values, val.paramId)) {
        this.state.values[val.paramId] = val.value;
      }
    });
  }

  updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const paramId = parseInt(target.dataset.paramId!, 10);
    const value = target.value;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [paramId]: value,
      },
    }));
  };

  getModel(): Model {
  return {
    paramValues: Object.keys(this.state.values)
      .map((key: string) => ({ 
        paramId: +key,
        value: this.state.values[parseInt(key)], 
      }))
      .filter((item) => item.value !== ''),
  };
}

  render() {
    return (
      <form>
        {this.props.params.map((param) => (
          <ParamInput
            key={param.id}
            param={param}
            value={this.state.values[param.id] || ''}
            onChange={this.updateValue}
          />
        ))}
      </form>
    );
  }
}

const ParamInput: React.FunctionComponent<{
  param: Param;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ param, value, onChange }) => {
  return (
    <div style={{ marginBottom: '8px' }}>
      <label htmlFor={`param-${param.id}`}>{param.name}:</label> {} 
      <input
        data-param-id={`${param.id}`} 
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ParamEditor;