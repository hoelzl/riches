import { Action } from "../core/Action";
import { Resolver } from "../SelectActionUsingReact";
import styles from "../App.module.css";

type ActionButtonProps = {
  action: Action;
  resolver: Resolver;
};

export function ActionButton({ action, resolver }: ActionButtonProps) {
  const className = styles.button;
  const title = action.shortDescription;

  return (
    <button onClick={() => resolver.resolve(action)} className={className}>
      {title}
    </button>
  );
}
