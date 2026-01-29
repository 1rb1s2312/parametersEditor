import * as React from 'react';

interface Param {
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
  colors?: unknown[];
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
      paramValues: Object.entries(this.state.values).map(([key, value]) => ({
        paramId: parseInt(key, 10),
        value,
      })),
    };
  }

  render() {
    return (
      <form>
        {this.props.params.map((param) => (
          <ParamInput
            key={param.id}
            param={param}
            value={this.state.values[param.id] ?? ''}
            onChange={this.updateValue}
          />
        ))}
      </form>
    );
  }
}

const ParamInput: React.FC<{
  param: Param;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ param, value, onChange }) => {
  return (
    <div style={{ marginBottom: '8px' }}>
      <label htmlFor={`param-${param.id}`}>{param.name}</label>
      <br />
      <input
        data-param-id={param.id.toString()}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ParamEditor;