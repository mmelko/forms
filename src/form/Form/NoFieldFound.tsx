import { Alert, Button, Card, CardBody } from '@patternfly/react-core';
import { FunctionComponent, useContext } from 'react';
import { CanvasFormTabsContext } from '../providers/canvas-form-tabs.provider';

export const NoFieldFound: FunctionComponent<{ className?: string }> = (props) => {
  const canvasFormTabsContext = useContext(CanvasFormTabsContext);

  return (
    <Card data-testid="no-field-found" className={props.className}>
      <CardBody>
        <Alert variant="info" title={`No ${canvasFormTabsContext.selectedTab} fields found`}>
          No field found matching this criteria. Please switch to the{' '}
          <Button
            onClick={() => {
              canvasFormTabsContext.setSelectedTab('All');
            }}
            variant="link"
            isInline
          >
            <b>All</b>
          </Button>{' '}
          tab.
        </Alert>
      </CardBody>
    </Card>
  );
};
