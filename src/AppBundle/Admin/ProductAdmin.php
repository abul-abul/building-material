<?php


namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class ProductAdmin extends Admin
{

    /**
     * @param \Sonata\AdminBundle\Show\ShowMapper $showMapper
     *
     * @return void
     */
    protected function configureShowFields(ShowMapper $showMapper)
    {
        $showMapper
            ->add('name', null, array(
                'label' => 'Имя',
            ))
            ->add('description', null, array(
                'label' => 'Описание',
            ))
            ->add('price', null, array(
                'label' => 'Цена',
            ))
            ->add('countPrice', null, array(
                'label' => 'Количество заказа',
            ))
            ->add('rebate', null, array(
                'label' => 'Скидка',
            ))
        ;
    }

    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('category', null, array(
                'label' => 'Категория',
            ))
            ->add('name', null, array(
                'label' => 'Имя',
            ))
            ->add('description', null, array(
                'label' => 'Описание',
            ))
            ->add('price', null, array(
                'label' => 'Цена',
            ))
//            ->add('countPrice', null, array(
//                'label' => 'Количество заказа',
//            ))
            ->add('rebate', null, array(
                'label' => 'Скидка',
            ))
            ->add('image', 'sonata_type_model_list',array( 'label' => 'Картинки' ), array('required' => false), array('link_parameters' => array('context' => 'default')))



            ->add('gallery', 'sonata_type_model_list',array( 'label' => 'Галерея' ), array('required' => false), array('link_parameters' => array('context' => 'default')))

        ;
    }

    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('id')
            ->add('name', null, array(
                'label' => 'Имя',
            ))
            ->add('description', null, array(
                'label' => 'Описание',
            ))
            ->add('price', null, array(
                'label' => 'Цена',
            ))
            ->add('countPrice', null, array(
                'label' => 'Количество заказа',
            ))
            ->add('rebate', null, array(
                'label' => 'Скидка',
            ))
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('id')
            ->add('name', null, array(
                'label' => 'Имя',
            ))

            ->add('price', null, array(
                'label' => 'Цена',
            ))
//            ->add('countPrice', null, array(
//                'label' => 'Количество заказа',
//            ))
            ->add('rebate', null, array(
                'label' => 'Скидка',
            ))
            ->add('category', null, array(
                'label' => 'Категория',
            ))
            ->add('_action', 'actions', array(
                'actions' => array(
                    'show' => array(),
                    'edit' => array(),
                    'delete' => array(),
                )
            ))
        ;
    }
}