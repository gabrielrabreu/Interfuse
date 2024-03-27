"""InitialCreate

Revision ID: 8392a40814eb
Revises: 
Create Date: 2024-03-27 17:00:44.468025

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '8392a40814eb'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Todos',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(), nullable=True),
                    sa.Column('description', sa.String(), nullable=True),
                    sa.Column('priority', sa.Integer(), nullable=True),
                    sa.Column('is_done', sa.Boolean(), nullable=True),
                    sa.Column('owner_id', sa.String(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_index(op.f('ix_Todos_id'), 'Todos', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_Todos_id'), table_name='Todos')
    op.drop_table('Todos')
    # ### end Alembic commands ###