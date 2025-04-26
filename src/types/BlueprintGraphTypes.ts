type AutoAssignConfig = {
  form_field?: string;
  form_key?: string;
  type: "client_org_role" | "primary_email" | "form_field_email";
  value: string;
};

type Duration = {
  number: number;
  unit: "minutes" | "hours" | "days";
};

type DataPromotionConfig = {
  [key: string]: string;
};

type InputMappingEntry = {
  component_key: string;
  is_metadata: boolean;
  output_key: string;
  type: string;
};

type InputMapping = {
  [key: string]: InputMappingEntry;
};

type StateTransitionRules = {
  state_transition_rules_if: {
    component_key: string;
    is_metadata: boolean;
    output_key: string;
    type: string;
  };
  state_transition_rules_then: "pending_approval" | "complete";
};

export type NodeData = {
  approval_auto_assign_config?: AutoAssignConfig;
  approval_required: boolean;
  approval_roles: string[] | null;
  approval_scheduled_delay?: Duration;
  approval_sla_duration?: Duration;
  approval_task_name?: string;
  auto_assign_config?: AutoAssignConfig;
  component_id: string;
  component_key: string;
  component_type: "form" | "branch" | "trigger" | "configuration";
  data_promotion_config?: DataPromotionConfig;
  id: string;
  input_mapping: InputMapping;
  name: string;
  permitted_roles: string[] | null;
  prerequisites: string[] | null;
  scheduled_delay?: Duration;
  sla_duration?: Duration;
  state_transition_rules?: StateTransitionRules;
};

export type EdgeData = {
  source: string;
  target: string;
};
